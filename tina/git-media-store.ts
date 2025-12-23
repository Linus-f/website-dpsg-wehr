import type { Media, MediaList, MediaListOptions, MediaStore, MediaUploadOptions } from 'tinacms';

// Defined in .env
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const REPO_OWNER = process.env.NEXT_PUBLIC_REPO_OWNER || 'Linus-f';
const REPO_NAME = process.env.NEXT_PUBLIC_REPO_NAME || 'website-dpsg-wehr';
const BRANCH = process.env.NEXT_PUBLIC_REPO_BRANCH || 'main';
const MEDIA_ROOT = 'media';
const PUBLIC_FOLDER = 'public';

export class GitMediaStore implements MediaStore {
    accept = '*';

    async persist(media: MediaUploadOptions[]): Promise<Media[]> {
        if (!GITHUB_TOKEN) {
            // eslint-disable-next-line no-console
            console.error('Missing NEXT_PUBLIC_GITHUB_TOKEN');
            alert('Missing NEXT_PUBLIC_GITHUB_TOKEN');
            throw new Error('Missing NEXT_PUBLIC_GITHUB_TOKEN');
        }
        const newMedia: Media[] = [];
        for (const item of media) {
            const { file, directory } = item;
            const dirPart = directory ? directory + '/' : '';
            const filePath = `${MEDIA_ROOT}/${dirPart}${file.name}`;
            const repoPath = `${PUBLIC_FOLDER}/${filePath}`;

            await this.uploadToGithub(repoPath, file);

            newMedia.push({
                type: 'file',
                id: filePath,
                filename: file.name,
                directory: directory,
                previewSrc: this.getRawUrl(repoPath),
                src: '/' + filePath,
            });
        }
        return newMedia;
    }

    async list(options?: MediaListOptions): Promise<MediaList> {
        if (!GITHUB_TOKEN) {
            // Fallback or empty if no token (user might be viewing without logging in?)
            // But this is called by CMS.
            // eslint-disable-next-line no-console
            console.warn('No GitHub Token available for media list');
            return { items: [], totalCount: 0, offset: 0, limit: 20 };
        }
        const directory = options?.directory ?? '';
        const offset = options?.offset ?? 0;
        const limit = options?.limit ?? 20;

        const dirPart = directory ? directory : '';
        const repoDir = `${PUBLIC_FOLDER}/${MEDIA_ROOT}${dirPart ? '/' + dirPart : ''}`;

        const files = await this.listGithubFiles(repoDir);

        const items = files.slice(offset, offset + limit).map((file) => {
            const relativePath = file.path.replace(new RegExp(`^${PUBLIC_FOLDER}/`), '');
            return {
                type: 'file' as const,
                id: relativePath,
                filename: file.name,
                directory: directory,
                previewSrc: this.getRawUrl(file.path),
                src: '/' + relativePath,
            };
        });

        return {
            items,
            totalCount: files.length,
            offset,
            limit,
            nextOffset: offset + limit < files.length ? offset + limit : undefined,
        };
    }

    async delete(media: Media): Promise<void> {
        // media.id is typically "media/filename.jpg" or "media/dir/filename.jpg"
        // We need to prepend public/
        const repoPath = `${PUBLIC_FOLDER}/${media.id}`;
        await this.deleteFromGithub(repoPath);
    }

    // --- Helpers ---

    private getRawUrl(repoPath: string): string {
        return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${repoPath}`;
    }

    private async fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                resolve(result.split(',')[1]);
            };
            reader.onerror = reject;
        });
    }

    private async listGithubFiles(path: string) {
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`;
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        if (!res.ok) {
            if (res.status === 404) return [];
            throw new Error(`Failed to list files: ${res.statusText}`);
        }

        const data = await res.json();
        if (!Array.isArray(data)) return [];

        return (
            data
                .filter((item: any) => item.type === 'file') // eslint-disable-line @typescript-eslint/no-explicit-any
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((item: any) => ({
                    name: item.name,
                    path: item.path, // public/media/...
                }))
        );
    }

    private async uploadToGithub(path: string, file: File) {
        const content = await this.fileToBase64(file);
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;

        // Get SHA if exists
        let sha: string | undefined;
        const checkRes = await fetch(`${url}?ref=${BRANCH}`, {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
        });
        if (checkRes.ok) {
            const data = await checkRes.json();
            sha = data.sha;
        }

        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Upload media ${path} via TinaCMS [skip ci]`,
                content: content,
                branch: BRANCH,
                sha: sha,
            }),
        });

        if (!res.ok) {
            throw new Error(`Failed to upload file: ${res.statusText}`);
        }
    }

    private async deleteFromGithub(path: string) {
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;

        const checkRes = await fetch(`${url}?ref=${BRANCH}`, {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
        });
        if (!checkRes.ok) return;
        const data = await checkRes.json();

        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Delete media ${path} via TinaCMS [skip ci]`,
                branch: BRANCH,
                sha: data.sha,
            }),
        });

        if (!res.ok) {
            throw new Error(`Failed to delete file: ${res.statusText}`);
        }
    }
}

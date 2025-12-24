import type { Media, MediaList, MediaListOptions, MediaStore, MediaUploadOptions } from 'tinacms';

// Defined in .env
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const REPO_OWNER = process.env.NEXT_PUBLIC_REPO_OWNER || 'Linus-f';
const REPO_NAME = process.env.NEXT_PUBLIC_REPO_NAME || 'website-dpsg-wehr';
const BRANCH = process.env.NEXT_PUBLIC_REPO_BRANCH || 'main';
const MEDIA_ROOT = 'media';
const PUBLIC_FOLDER = 'public';

export class GitMediaStore implements MediaStore {
    accept = 'image/*';

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

            const githubUrl = this.getRawUrl(repoPath);
            const localUrl = '/' + filePath;

            newMedia.push({
                type: 'file',
                id: filePath,
                filename: file.name,
                directory: directory || '',
                thumbnails: {
                    '75x75': githubUrl,
                },
                src: localUrl,
            });
        }
        return newMedia;
    }

    async list(options?: MediaListOptions): Promise<MediaList> {
        if (!GITHUB_TOKEN) {
            console.warn('No GitHub Token available for media list');
            return { items: [] };
        }

        const directory = options?.directory ?? '';
        const offset = options?.offset ?? 0;
        const limit = options?.limit ?? 20;
        const dirPart = directory ? directory : '';
        const repoDir = `${PUBLIC_FOLDER}/${MEDIA_ROOT}${dirPart ? '/' + dirPart : ''}`;

        try {
            const rawItems = await this.listGithubFiles(repoDir);

            const items: Media[] = rawItems
                .slice(Number(offset), Number(offset) + limit)
                .map((item) => {
                    const relativePath = item.path.replace(new RegExp(`^${PUBLIC_FOLDER}/`), '');
                    const githubUrl = this.getRawUrl(item.path);
                    const localUrl = '/' + relativePath;

                    let mediaItem: Media;

                    if (item.type === 'dir') {
                        mediaItem = {
                            type: 'dir',
                            id: relativePath,
                            filename: item.name,
                            directory: directory || '',
                            thumbnails: {} as Record<string, string>,
                            src: localUrl,
                        };
                    } else {
                        mediaItem = {
                            type: 'file',
                            id: relativePath,
                            filename: item.name,
                            directory: directory || '',
                            thumbnails: {
                                '75x75': githubUrl,
                                '400x400': githubUrl,
                                '1000x1000': githubUrl,
                            },
                            src: localUrl,
                        };
                    }
                    return mediaItem;
                });

            // Global debug helper
            if (typeof window !== 'undefined') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as any).lastTinaMediaItems = items;
                // eslint-disable-next-line no-console
                console.log(
                    'GitMediaStore: Returning items to TinaCMS. Type "window.lastTinaMediaItems" to inspect.'
                );
            }

            return {
                items,
                nextOffset:
                    Number(offset) + limit < rawItems.length ? Number(offset) + limit : undefined,
            };
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('GitMediaStore: List failed', e);
            return { items: [] };
        }
    }

    async delete(media: Media): Promise<void> {
        const repoPath = `${PUBLIC_FOLDER}/${media.id}`;
        await this.deleteFromGithub(repoPath);
    }

    parse(media: Media): string {
        return media.src || '';
    }

    previewSrc(src: string): string {
        if (!src) return '';
        if (src.startsWith('http')) return src;
        const path = src.startsWith('/') ? src : `/${src}`;
        if (path.startsWith('/media/')) {
            return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/public${path}`;
        }
        return src;
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .filter((item: any) => {
                    if (item.type === 'dir') return true;
                    if (item.type === 'file') {
                        return /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(item.name);
                    }
                    return false;
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((item: any) => ({
                    name: item.name,
                    path: item.path,
                    type: item.type,
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

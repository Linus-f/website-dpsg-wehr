var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) =>
    function __init() {
        return (fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res);
    };
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};

// tina/git-media-store.ts
var git_media_store_exports = {};
__export(git_media_store_exports, {
    GitMediaStore: () => GitMediaStore,
});
var GITHUB_TOKEN, REPO_OWNER, REPO_NAME, BRANCH, MEDIA_ROOT, PUBLIC_FOLDER, GitMediaStore;
var init_git_media_store = __esm({
    'tina/git-media-store.ts'() {
        'use strict';
        GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        REPO_OWNER = process.env.NEXT_PUBLIC_REPO_OWNER || 'Linus-f';
        REPO_NAME = process.env.NEXT_PUBLIC_REPO_NAME || 'website-dpsg-wehr';
        BRANCH = process.env.NEXT_PUBLIC_REPO_BRANCH || 'main';
        MEDIA_ROOT = 'media';
        PUBLIC_FOLDER = 'public';
        GitMediaStore = class {
            accept = '*';
            async persist(media) {
                if (!GITHUB_TOKEN) {
                    console.error('Missing NEXT_PUBLIC_GITHUB_TOKEN');
                    alert('Missing NEXT_PUBLIC_GITHUB_TOKEN');
                    throw new Error('Missing NEXT_PUBLIC_GITHUB_TOKEN');
                }
                const newMedia = [];
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
                        directory,
                        thumbnails: {
                            '75x75': this.getRawUrl(repoPath),
                        },
                        src: '/' + filePath,
                    });
                }
                return newMedia;
            }
            async list(options) {
                if (!GITHUB_TOKEN) {
                    console.warn('No GitHub Token available for media list');
                    return { items: [] };
                }
                const directory = options?.directory ?? '';
                const offset = options?.offset ?? 0;
                const limit = options?.limit ?? 20;
                const dirPart = directory ? directory : '';
                const repoDir = `${PUBLIC_FOLDER}/${MEDIA_ROOT}${dirPart ? '/' + dirPart : ''}`;
                const files = await this.listGithubFiles(repoDir);
                const items = files.slice(Number(offset), Number(offset) + limit).map((file) => {
                    const relativePath = file.path.replace(new RegExp(`^${PUBLIC_FOLDER}/`), '');
                    return {
                        type: 'file',
                        id: relativePath,
                        filename: file.name,
                        directory,
                        thumbnails: {
                            '75x75': this.getRawUrl(file.path),
                        },
                        src: '/' + relativePath,
                    };
                });
                return {
                    items,
                    nextOffset:
                        Number(offset) + limit < files.length ? Number(offset) + limit : void 0,
                };
            }
            async delete(media) {
                const repoPath = `${PUBLIC_FOLDER}/${media.id}`;
                await this.deleteFromGithub(repoPath);
            }
            // --- Helpers ---
            getRawUrl(repoPath) {
                return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${repoPath}`;
            }
            async fileToBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        const result = reader.result;
                        resolve(result.split(',')[1]);
                    };
                    reader.onerror = reject;
                });
            }
            async listGithubFiles(path) {
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
                return data
                    .filter((item) => item.type === 'file')
                    .map((item) => ({
                        name: item.name,
                        path: item.path,
                        // public/media/...
                    }));
            }
            async uploadToGithub(path, file) {
                const content = await this.fileToBase64(file);
                const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
                let sha;
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
                        content,
                        branch: BRANCH,
                        sha,
                    }),
                });
                if (!res.ok) {
                    throw new Error(`Failed to upload file: ${res.statusText}`);
                }
            }
            async deleteFromGithub(path) {
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
        };
    },
});

// tina/config.ts
import { defineConfig } from 'tinacms';
var branch =
    process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';
var mdxTemplates = [
    {
        name: 'MDXImage',
        label: 'MDX Image',
        fields: [
            { type: 'image', name: 'src', label: 'Source' },
            { type: 'string', name: 'alt', label: 'Alt Text' },
            { type: 'number', name: 'width', label: 'Width' },
            { type: 'number', name: 'height', label: 'Height' },
            { type: 'boolean', name: 'priority', label: 'Priority' },
        ],
    },
    {
        name: 'Img',
        label: 'Simple Image',
        fields: [
            { type: 'image', name: 'src', label: 'Source' },
            { type: 'string', name: 'alt', label: 'Alt Text' },
        ],
    },
    {
        name: 'Download',
        label: 'Download Link',
        fields: [
            { type: 'string', name: 'src', label: 'File Path' },
            { type: 'string', name: 'title', label: 'Link Title' },
        ],
    },
    {
        name: 'RecentPosts',
        label: 'Recent Posts',
        fields: [
            {
                type: 'string',
                name: 'dummy',
                label: 'Dummy Field (ignore)',
                ui: { component: 'hidden' },
            },
        ],
    },
    {
        name: 'Calendar',
        label: 'Calendar',
        fields: [
            {
                type: 'string',
                name: 'dummy',
                label: 'Dummy Field (ignore)',
                ui: { component: 'hidden' },
            },
        ],
    },
    {
        name: 'GroupOverview',
        label: 'Group Overview',
        fields: [
            { type: 'string', name: 'name', label: 'Group Name' },
            { type: 'string', name: 'time', label: 'Meeting Time' },
            { type: 'string', name: 'age', label: 'Age Group' },
        ],
    },
    {
        name: 'Acrostichon',
        label: 'Acrostichon',
        fields: [
            {
                type: 'object',
                name: 'data',
                label: 'Rows',
                list: true,
                fields: [
                    { type: 'string', name: 'left', label: 'Left' },
                    { type: 'string', name: 'middle', label: 'Middle' },
                    { type: 'string', name: 'right', label: 'Right' },
                ],
            },
        ],
    },
];
var isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';
var config_default = defineConfig({
    branch: isLocal ? 'main' : branch,
    clientId: isLocal ? void 0 : process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    token: isLocal ? void 0 : process.env.TINA_TOKEN,
    contentApiUrlOverride: isLocal ? 'http://localhost:4001/graphql' : void 0,
    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },
    media: {
        loadCustomStore: async () => {
            const pack = await Promise.resolve().then(
                () => (init_git_media_store(), git_media_store_exports)
            );
            return pack.GitMediaStore;
        },
    },
    // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
    schema: {
        collections: [
            {
                name: 'post',
                label: 'Aktuelles',
                path: 'content/posts',
                format: 'mdx',
                ui: {
                    router: ({ document }) => `/posts/${document._sys.filename}`,
                },
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        label: 'Title',
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'string',
                        name: 'subtitle',
                        label: 'Subtitle',
                    },
                    {
                        type: 'string',
                        name: 'author',
                        label: 'Author',
                    },
                    {
                        type: 'datetime',
                        name: 'date',
                        label: 'Date',
                    },
                    {
                        type: 'string',
                        name: 'slug',
                        label: 'Slug',
                    },
                    {
                        type: 'image',
                        name: 'image',
                        label: 'Header Image',
                    },
                    {
                        type: 'string',
                        name: 'desc',
                        label: 'Description',
                        ui: {
                            component: 'textarea',
                        },
                    },
                    {
                        type: 'rich-text',
                        name: 'body',
                        label: 'Body',
                        isBody: true,
                        templates: mdxTemplates,
                    },
                ],
            },
            {
                name: 'page',
                label: 'Seiten',
                path: 'content/pages',
                format: 'mdx',
                ui: {
                    router: ({ document }) => {
                        if (document._sys.filename === 'startseite') {
                            return '/';
                        }
                        return `/pages/${document._sys.filename}`;
                    },
                },
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        label: 'Title',
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'string',
                        name: 'author',
                        label: 'Author',
                    },
                    {
                        type: 'datetime',
                        name: 'date',
                        label: 'Date',
                    },
                    {
                        type: 'rich-text',
                        name: 'body',
                        label: 'Body',
                        isBody: true,
                        templates: mdxTemplates,
                    },
                ],
            },
            {
                name: 'gruppen',
                label: 'Gruppen',
                path: 'content/gruppen',
                format: 'mdx',
                ui: {
                    router: ({ document }) => `/pages/gruppen/${document._sys.filename}`,
                },
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        label: 'Title',
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'string',
                        name: 'author',
                        label: 'Author',
                    },
                    {
                        type: 'datetime',
                        name: 'date',
                        label: 'Date',
                    },
                    {
                        type: 'rich-text',
                        name: 'body',
                        label: 'Body',
                        isBody: true,
                        templates: mdxTemplates,
                    },
                ],
            },
            {
                name: 'global',
                label: 'Allgemeine Einstellungen',
                path: 'content/global',
                format: 'json',
                ui: {
                    global: true,
                    allowedActions: {
                        create: false,
                        delete: false,
                    },
                },
                fields: [
                    {
                        type: 'object',
                        name: 'header',
                        label: 'Header',
                        fields: [
                            {
                                type: 'object',
                                name: 'nav',
                                label: 'Navigation Links',
                                list: true,
                                ui: {
                                    itemProps: (item) => {
                                        return { label: item?.label };
                                    },
                                },
                                fields: [
                                    { type: 'string', name: 'label', label: 'Label' },
                                    { type: 'string', name: 'link', label: 'Link' },
                                    {
                                        type: 'string',
                                        name: 'icon',
                                        label: 'Icon',
                                        options: [
                                            'Lilie',
                                            'None',
                                            'News',
                                            'People',
                                            'Image',
                                            'Calendar',
                                            'Help',
                                            'House',
                                            'Search',
                                            'More',
                                            'File',
                                        ],
                                    },
                                    { type: 'string', name: 'color', label: 'Icon Color' },
                                    {
                                        type: 'object',
                                        name: 'links',
                                        label: 'Sub Links',
                                        list: true,
                                        ui: {
                                            itemProps: (item) => {
                                                return { label: item?.label };
                                            },
                                        },
                                        fields: [
                                            { type: 'string', name: 'label', label: 'Label' },
                                            { type: 'string', name: 'link', label: 'Link' },
                                            {
                                                type: 'string',
                                                name: 'icon',
                                                label: 'Icon',
                                                options: [
                                                    'Lilie',
                                                    'None',
                                                    'News',
                                                    'People',
                                                    'Image',
                                                    'Calendar',
                                                    'Help',
                                                    'House',
                                                    'Search',
                                                    'More',
                                                    'File',
                                                ],
                                            },
                                            {
                                                type: 'string',
                                                name: 'color',
                                                label: 'Icon Color',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'object',
                        name: 'footer',
                        label: 'Footer',
                        fields: [
                            {
                                type: 'object',
                                name: 'social',
                                label: 'Social Media',
                                fields: [
                                    {
                                        type: 'string',
                                        name: 'facebook',
                                        label: 'Facebook URL',
                                    },
                                    {
                                        type: 'string',
                                        name: 'instagram',
                                        label: 'Instagram URL',
                                    },
                                ],
                            },
                            {
                                type: 'object',
                                name: 'columns',
                                label: 'Footer Columns',
                                list: true,
                                ui: {
                                    itemProps: (item) => {
                                        return { label: item?.title };
                                    },
                                },
                                fields: [
                                    { type: 'string', name: 'title', label: 'Column Title' },
                                    {
                                        type: 'object',
                                        name: 'links',
                                        label: 'Links',
                                        list: true,
                                        ui: {
                                            itemProps: (item) => {
                                                return { label: item?.text };
                                            },
                                        },
                                        fields: [
                                            { type: 'string', name: 'text', label: 'Text' },
                                            { type: 'string', name: 'url', label: 'URL' },
                                            {
                                                type: 'boolean',
                                                name: 'external',
                                                label: 'External Link',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
});
export { config_default as default };

import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxTemplates: any[] = [
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

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default defineConfig({
    branch: isLocal ? 'main' : branch,
    clientId: isLocal ? undefined : process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    token: isLocal ? undefined : process.env.TINA_TOKEN,
    contentApiUrlOverride: isLocal ? 'http://localhost:4001/graphql' : undefined,

    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },
    media: {
        loadCustomStore: async () => {
            const pack = await import('./git-media-store');
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

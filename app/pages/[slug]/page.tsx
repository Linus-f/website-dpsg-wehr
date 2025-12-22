import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import { mdxComponents } from '@/mdx-components';
import rehypeImgSize from 'rehype-img-size';
import { getExcerpt } from '@/lib/metadata';

import client from '@/tina/__generated__/client';
import TinaContentClient from '@/components/TinaContentClient';
import { createClient } from 'tinacms/dist/client';
import { queries } from '@/tina/__generated__/types';

const localClient = createClient({
    url: 'http://localhost:9005/graphql',
    token: 'dummy',
    queries,
});

export async function generateStaticParams() {
    const folder = 'content/pages/';
    const files = fs.readdirSync(folder).filter((file) => file.endsWith('.mdx'));

    return files.map((filename) => ({
        slug: filename.replace('.mdx', ''),
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'content/pages', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const description = getExcerpt(content);

    return {
        title: `${data.title} - DPSG Wehr`,
        description: description,
        openGraph: {
            title: `${data.title} - DPSG Wehr`,
            description: description,
            type: 'website',
            images: [
                {
                    url: '/images/logo.png',
                    width: 800,
                    height: 800,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} - DPSG Wehr`,
            description: description,
            images: ['/images/logo.png'],
        },
    };
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let tinaData;
    try {
        try {
            tinaData = await client.queries.page({ relativePath: `${slug}.mdx` });
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.log('Default Tina client failed, trying localhost:9005 fallback...');
                tinaData = await localClient.queries.page({ relativePath: `${slug}.mdx` });
            } else {
                throw e;
            }
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error fetching Tina data, falling back to MDXRemote', e);
    }

    if (tinaData) {
        return (
            <TinaContentClient
                data={JSON.parse(JSON.stringify(tinaData.data))}
                query={tinaData.query}
                variables={tinaData.variables}
                contentType="page"
            />
        );
    }

    const filePath = path.join(process.cwd(), 'content/pages', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContents);

    return (
        <article className="prose sm:prose-lg dark:prose-invert max-w-none">
            <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                    mdxOptions: {
                        rehypePlugins: [[rehypeImgSize as never, { dir: 'public' }]],
                    },
                }}
            />
        </article>
    );
}

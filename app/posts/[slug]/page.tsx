import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import getPostMetadata from '@/lib/PostMetadata';
import { mdxComponents } from '@/mdx-components';
import Post from '@/components/Post';
import rehypeImgSize from 'rehype-img-size';
import { getExcerpt, getOptimizedImageMetadata } from '@/lib/metadata';
import client from '@/tina/__generated__/client';
import TinaContentClient from '@/components/TinaContentClient';
import { createClient } from 'tinacms/dist/client';
import { queries } from '@/tina/__generated__/types';

const localClient = createClient({
    url: 'http://127.0.0.1:4001/graphql',
    token: 'dummy',
    queries,
});

export async function generateStaticParams() {
    const posts = getPostMetadata();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const description = getExcerpt(content);
    const postMetadata = getPostMetadata();
    const metadata = postMetadata.find((post) => post.slug === slug);

    let images: { url: string; width: number; height: number }[] = [
        {
            url: '/images/logo.png',
            width: 800,
            height: 800,
        },
    ];

    if (metadata?.image.src) {
        const optimized = getOptimizedImageMetadata(
            metadata.image.src,
            metadata.image.width,
            metadata.image.height
        );
        if (optimized) {
            images = [optimized];
        } else {
            images = [
                {
                    url: metadata.image.src,
                    width: metadata.image.width,
                    height: metadata.image.height,
                },
            ];
        }
    }

    return {
        title: `${data.title} - DPSG Wehr`,
        description: description,
        openGraph: {
            title: `${data.title} - DPSG Wehr`,
            description: description,
            type: 'article',
            publishedTime: data.date as string,
            authors: [data.author as string],
            images: images,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} - DPSG Wehr`,
            description: description,
            images: images.map((img) => img.url),
        },
    };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const postMetadata = getPostMetadata();

    let tinaData;
    try {
        try {
            tinaData = await client.queries.post({ relativePath: `${slug}.mdx` });
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.log('Default Tina client failed, trying 127.0.0.1 fallback...');
                tinaData = await localClient.queries.post({ relativePath: `${slug}.mdx` });
            } else {
                throw e;
            }
        }

        return (
            <TinaContentClient
                data={JSON.parse(JSON.stringify(tinaData.data))}
                query={tinaData.query}
                variables={tinaData.variables}
                contentType="post"
                postMetadata={postMetadata}
            />
        );
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('TINA_FETCH_ERROR: Falling back to MDXRemote', e);
        const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { content } = matter(fileContents);

        return (
            <Post postMetadata={postMetadata} slug={slug}>
                <MDXRemote
                    source={content}
                    components={mdxComponents}
                    options={{
                        mdxOptions: {
                            rehypePlugins: [[rehypeImgSize as never, { dir: 'public' }]],
                        },
                    }}
                />
            </Post>
        );
    }
}

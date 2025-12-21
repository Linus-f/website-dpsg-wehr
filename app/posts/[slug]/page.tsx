import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import getPostMetadata from '@/lib/PostMetadata';
import { useMDXComponents } from '@/mdx-components';
import Post from '@/components/Post';
import rehypeImgSize from 'rehype-img-size';
import { getExcerpt } from '@/lib/metadata';

export async function generateStaticParams() {
    const posts = getPostMetadata();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const description = getExcerpt(content);

    return {
        title: `${data.title} - DPSG Wehr`,
        description: description,
        openGraph: {
            title: data.title,
            description: description,
            type: 'article',
            publishedTime: data.date,
            authors: [data.author],
            images: data.image ? [{ url: data.image }] : ['/images/logo.png'],
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: description,
            images: data.image ? [data.image] : ['/images/logo.png'],
        }
    };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContents);
    
    // We use useMDXComponents to get the custom image rendering
    const components = useMDXComponents({});
    const postMetadata = getPostMetadata();

    return (
        <Post postMetadata={postMetadata} slug={slug}>
            <MDXRemote 
                source={content} 
                components={components}
                options={{
                    mdxOptions: {
                        rehypePlugins: [[rehypeImgSize as any, { dir: 'public' }]],
                    }
                }}
            />
        </Post>
    );
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import { useMDXComponents } from '@/mdx-components';
import rehypeImgSize from 'rehype-img-size';
import { getExcerpt } from '@/lib/metadata';

export async function generateStaticParams() {
    const folder = "content/pages/";
    const files = fs.readdirSync(folder).filter(file => file.endsWith('.mdx'));
    
    return files.map((filename) => ({
        slug: filename.replace('.mdx', ''),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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
        }
    };
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'content/pages', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContents);
    
    const components = useMDXComponents({});

    return (
        <article className="prose sm:prose-lg dark:prose-invert max-w-none">
            <MDXRemote 
                source={content} 
                components={components}
                options={{
                    mdxOptions: {
                        rehypePlugins: [[rehypeImgSize as any, { dir: 'public' }]],
                    }
                }}
            />
        </article>
    );
}

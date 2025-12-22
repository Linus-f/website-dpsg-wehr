import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/mdx-components';
import rehypeImgSize from 'rehype-img-size';

export default function Home() {
    const filePath = path.join(process.cwd(), 'content/pages/startseite.mdx');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContents);

    return (
        <div className="dark:text-white">
            <div className="landing-content prose sm:prose-lg dark:prose-invert max-w-none">
                <MDXRemote
                    source={content}
                    components={mdxComponents}
                    options={{
                        mdxOptions: {
                            rehypePlugins: [[rehypeImgSize as never, { dir: 'public' }]],
                        },
                    }}
                />
            </div>
        </div>
    );
}

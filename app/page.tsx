import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/mdx-components';
import rehypeImgSize from 'rehype-img-size';
import client from '@/tina/__generated__/client';
import TinaContentClient from '@/components/TinaContentClient';
import { createClient } from 'tinacms/dist/client';
import { queries } from '@/tina/__generated__/types';

const localClient = createClient({
    url: 'http://localhost:9005/graphql',
    token: 'dummy',
    queries,
});

export default async function Home() {
    let tinaData;
    try {
        try {
            tinaData = await client.queries.page({ relativePath: 'startseite.mdx' });
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.log('Default Tina client failed, trying localhost:9005 fallback...');
                tinaData = await localClient.queries.page({ relativePath: 'startseite.mdx' });
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
            <div className="dark:text-white">
                <TinaContentClient
                    data={JSON.parse(JSON.stringify(tinaData.data))}
                    query={tinaData.query}
                    variables={tinaData.variables}
                    contentType="page"
                    className="landing-content"
                />
            </div>
        );
    }

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

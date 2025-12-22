import fs from 'fs';
import matter from 'gray-matter';
import { PostMetadata } from '@/types';
import imageSize from 'image-size';

export default function getPostMetadata(): PostMetadata[] {
    const folder = 'content/posts/';

    const files = fs.readdirSync(folder).filter((file) => file.endsWith('.mdx'));

    const posts = files.map((filename) => {
        const slug = filename.replace('.mdx', '');
        const fileContents = fs.readFileSync(`content/posts/${filename}`, 'utf8');
        const matterResult = matter(fileContents);
        let imgSize = undefined;
        if (matterResult.data.image) {
            try {
                const buffer = fs.readFileSync(`public/${matterResult.data.image}`);
                imgSize = imageSize(buffer);
            } catch {
                // Ignore error if image not found
            }
        }

        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            subtitle: matterResult.data.subtitle,
            author: matterResult.data.author,
            slug: slug,
            image: {
                src: matterResult.data.image,
                width: imgSize?.width ? imgSize.width : 0,
                height: imgSize?.height ? imgSize.height : 0,
            },
            desc: matterResult.data.desc,
        };
    });

    posts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();
    });

    return posts;
}

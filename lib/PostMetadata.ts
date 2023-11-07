import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "@/types";
import imageSize from "image-size";

export default function getPostMetadata(): PostMetadata[] {
    const folder = "app/posts/";

    const dirs = fs.readdirSync(folder, { withFileTypes: true })
        .filter(file => file.isDirectory())
        .map(dir => dir.name);

    const posts = dirs.map(dir => {
        const fileContents = fs.readFileSync(`app/posts/${dir}/page.mdx`, "utf8");
        const matterResult = matter(fileContents);
        const imgSize = matterResult.data.image ? imageSize(`public/${matterResult.data.image}`) : undefined;
        
        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            subtitle: matterResult.data.subtitle,
            author: matterResult.data.author,
            slug: dir,
            image: {
                src: matterResult.data.image,
                width: imgSize?.width ? imgSize.width : 0,
                height: imgSize?.height ? imgSize.height : 0,
            },
            desc: matterResult.data.desc,
        }
    });

    posts.sort((a, b) => {

        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();
    });

    return posts;
}

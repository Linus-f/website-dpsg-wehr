import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "@/types";

const getPostMetadata = (): PostMetadata[] => {
    const folder = "app/posts/";

    const dirs = fs.readdirSync(folder, { withFileTypes: true })
        .filter(file => file.isDirectory())
        .map(dir => dir.name);

    const posts = dirs.map(dir => {
        const fileContents = fs.readFileSync(`app/posts/${dir}/page.mdx`, "utf8");
        const matterResult = matter(fileContents);
        
        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            subtitle: matterResult.data.subtitle,
            author: matterResult.data.author,
            slug: dir,
        }
    });

    return posts;
}

export default getPostMetadata;

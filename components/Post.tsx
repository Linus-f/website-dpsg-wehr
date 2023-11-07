"use client";

import { PostMetadata } from "@/types";
import { usePathname } from 'next/navigation';
import FloatingImage from "./FloatingImage";
import imageSize from "image-size";

function getSlug(path: string) {
    const trimmedPath = path.replace(/\/$/, ''); // Remove any trailing slashes
    const parts = trimmedPath.split('/'); // Split the path by '/'
    const lastPart = parts[parts.length - 1]; // Retrieve the last part

    return lastPart;
}

export default function Post({ postMetadata, children }: { postMetadata: PostMetadata[], children: React.ReactNode}) {
    const slug = getSlug(usePathname());
    const metadata = postMetadata.find((post) => post.slug === slug)!;

    return (
        <div>
            <FloatingImage src={metadata.image.src} alt={metadata.title} width={metadata.image.width} height={metadata.image.height}/>
            <article className="prose sm:prose-lg dark:prose-invert">
                {children}
            </article>
        </div>
    );
}
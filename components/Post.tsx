"use client";

import { PostMetadata } from "@/types";
import { usePathname } from 'next/navigation';
import FloatingImage from "./FloatingImage";
import { formatPostDate } from "@/lib/date";

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
            {metadata.image.src && <FloatingImage src={metadata.image.src} alt={metadata.title} width={metadata.image.width} height={metadata.image.height}/>}
            <div className="mb-8">
                <h1 className="text-center text-4xl font-bold">{metadata.title}</h1>
                <h2 className="text-center text-xl font-light">{metadata.subtitle}</h2>
            </div>
            <p className="text-center font-light text-gray-700 dark:text-gray-300">{formatPostDate(metadata.date)}</p>
            <hr className="mt-3 mb-12"></hr>
            <article className="prose sm:prose-lg dark:prose-invert">
                {children}
            </article>
        </div>
    );
}
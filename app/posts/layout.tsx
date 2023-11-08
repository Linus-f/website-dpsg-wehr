import React from 'react';
import Post from "@/components/Post";
import getPostMetadata from '@/lib/PostMetadata';

export default function PostLayout({ children } : { children: React.ReactNode }) {
    const postMetadata = getPostMetadata();

    return (
        <Post postMetadata={postMetadata}>
            {children}
        </Post>
    );
}

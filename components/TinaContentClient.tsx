/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useTina } from 'tinacms/dist/react';
import Post from './Post';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PostMetadata } from '@/types';
import MDXImage from './MDXImage';
import Calendar from './DynamicCalendar';
import Download from './Download';
import RecentPosts from './RecentPosts.client';
import GroupOverview from './GroupOverview';
import Acrostichon from './Acrostichon';

const fixSrc = (src: string) => {
    if (!src) return src;
    try {
        const url = new URL(src);
        if (url.protocol === 'https:' && url.hostname === 'assets.tina.io') {
            // Extract the path after the Tina Cloud ID
            const pathParts = url.pathname.split('/').filter(Boolean);
            if (pathParts.length > 1) {
                const pathWithoutId = pathParts.slice(1).join('/');
                // Prepend /media if it's not already there to match local structure
                return pathWithoutId.startsWith('media/')
                    ? `/${pathWithoutId}`
                    : `/media/${pathWithoutId}`;
            }
        }
    } catch {
        // Fall through
    }
    return !src.startsWith('/') && !src.startsWith('http') ? `/${src}` : src;
};

export default function TinaContentClient(props: {
    data: any;
    variables: any;
    query: string;
    contentType: 'post' | 'page' | 'gruppen';
    postMetadata?: PostMetadata[];
    className?: string;
}) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const components = {
        img: (props: any) => (
            <img {...props} src={fixSrc(props.src || props.url)} className="max-w-full h-auto" />
        ),
        MDXImage: (props: any) => <MDXImage {...props} src={fixSrc(props.src)} />,
        Img: (props: any) => <MDXImage {...props} src={fixSrc(props.src)} />,
        Calendar: (props: any) => <Calendar {...props} />,
        Download: (props: any) => <Download {...props} />,
        RecentPosts: (innerProps: any) => (
            <RecentPosts postMetadata={props.postMetadata} {...innerProps} />
        ),
        GroupOverview: (props: any) => <GroupOverview {...props} />,
        Acrostichon: (props: any) => <Acrostichon {...props} />,
    };

    const content = data[props.contentType];

    if (props.contentType === 'post') {
        const overrideMetadata = {
            ...content,
            ...(content.image
                ? {
                      image: {
                          src: fixSrc(content.image),
                          width: 1200, // Default for preview
                          height: 600,
                      },
                  }
                : {}),
        };

        return (
            <Post
                postMetadata={props.postMetadata || []}
                slug={content.slug}
                overrideMetadata={overrideMetadata}
            >
                <TinaMarkdown content={content.body} components={components} />
            </Post>
        );
    }

    return (
        <article
            className={`prose sm:prose-lg dark:prose-invert max-w-none ${props.className || ''}`}
        >
            <TinaMarkdown content={content.body} components={components} />
        </article>
    );
}

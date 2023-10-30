import React from 'react';


export default function PostLayout({ children } : { children: React.ReactNode }) {
    return (
        <div>
            <article className="prose sm:prose-lg dark:prose-invert">
                {children}
            </article>
        </div>
    );
}

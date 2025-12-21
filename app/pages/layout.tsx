export default function PostLayout({ children } : { children: React.ReactNode }) {
    return <article className="prose sm:prose-lg dark:prose-invert max-w-none">{children}</article>
}

export default function PostLayout({ children } : { children: React.ReactNode }) {
    return <article className="prose lg:prose:xl dark:prose-invert">{children}</article>
}

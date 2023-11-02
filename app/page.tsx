import Content from './pages/startseite/page.mdx'
import PhotoAlbumWrapper from '../components/PhotoAlbumWrapper'

export default function Home() {
    return (
        <article className="prose sm:prose-lg dark:prose-invert">
            <Content />
        </article>

    )
}

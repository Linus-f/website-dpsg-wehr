import getPostMetadata  from '../components/PostMetadata';
import PostPreview from '../components/PostPreview';

export default function Home() {
    const postMetadata = getPostMetadata();
    const postPreviews = postMetadata.map(data => (
        <PostPreview key={data.slug} {...data} />
    ));

    return <>{postPreviews}</>;
}

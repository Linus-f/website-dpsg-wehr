import getPostMetadata  from '@/lib/PostMetadata';
import PostPreview from '@/components/PostPreview';

export default function Aktuelles() {
    const postMetadata = getPostMetadata();
    const postPreviews = postMetadata.map(data => (
        <PostPreview key={data.slug} {...data} />
    ));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postPreviews}
        </div>
    );
}
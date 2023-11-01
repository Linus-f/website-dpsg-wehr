import getPostMetadata  from '@/lib/PostMetadata';
import PostPreview from '@/components/PostPreview';
import { formatPostDate } from '@/lib/date';

export default function Aktuelles() {
    const postMetadata = getPostMetadata();
    const postPreviews = postMetadata.map(data => {
        data.date = formatPostDate(data.date)

        return <PostPreview key={data.slug} {...data} />
});

    return (
        <div className="grid grid-cols-1 s:grid-cols-2 gap-4">
            {postPreviews}
        </div>
    );
}
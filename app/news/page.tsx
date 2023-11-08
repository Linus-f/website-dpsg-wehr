import getPostMetadata  from '@/lib/PostMetadata';
import PostPreview from '@/components/PostPreview';
import { formatPostDate } from '@/lib/date';
import Calendar from '@/components/Calendar';

export default function Aktuelles() {
    const postMetadata = getPostMetadata();
    const postPreviews = postMetadata.map(data => {
        data.date = formatPostDate(data.date)

        return <PostPreview key={data.slug} {...data} />
});

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto sm:max-w-max">
            {postPreviews}
        </div>
    );
}
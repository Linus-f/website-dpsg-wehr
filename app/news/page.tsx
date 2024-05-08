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
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto sm:max-w-max">
                {postPreviews}
            </div>

            {postPreviews.length == 0 && (
                <div className="text-center">
                    <p className="text-xl font-bold">Hier gibt&apos;s noch nichts zu sehen.</p>
                </div>
            )}
        </>
    );
}
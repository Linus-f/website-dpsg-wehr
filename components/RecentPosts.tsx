import getPostMetadata  from '@/lib/PostMetadata';
import PostPreview from '@/components/PostPreview';
import { formatPostDate } from '@/lib/date';

export default function RecentPosts() {
    const postMetadata = getPostMetadata();
    const postPreviews = postMetadata.map(data => {
        data.date = formatPostDate(data.date)

        return <PostPreview key={data.slug} {...data} />
    });

    const latestPreviews = postPreviews.slice(0, 1);

    return (
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto sm:max-w-max no-underline">
        {latestPreviews}
      </div>
    );
}

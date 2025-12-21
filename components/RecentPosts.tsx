import getPostMetadata  from '@/lib/PostMetadata';
import PostPreview from '@/components/PostPreview';
import { formatPostDate } from '@/lib/date';

export default function RecentPosts() {
    const postMetadata = getPostMetadata();
    const latestPost = postMetadata[0];

    if (!latestPost) return null;

    const displayDate = formatPostDate(latestPost.date);

    return (
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto sm:max-w-max no-underline" >
        <PostPreview key={latestPost.slug} {...latestPost} date={displayDate} />
      </div>
    );
}

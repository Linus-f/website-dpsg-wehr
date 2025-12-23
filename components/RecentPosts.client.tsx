import PostPreview from '@/components/PostPreview';
import { formatPostDate } from '@/lib/date';
import { PostMetadata } from '@/types';

export default function RecentPostsClient({ postMetadata }: { postMetadata?: PostMetadata[] }) {
    if (!postMetadata || postMetadata.length === 0) {
        return (
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-gray-500">Recent Posts Component (Preview)</p>
            </div>
        );
    }

    const latestPost = postMetadata[0];
    const displayDate = formatPostDate(latestPost.date);

    return (
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto sm:ml-0 no-underline">
            <PostPreview key={latestPost.slug} {...latestPost} date={displayDate} />
        </div>
    );
}

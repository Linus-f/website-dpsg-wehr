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

    const recentPosts = postMetadata.slice(0, 2);

    return (
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mx-auto sm:ml-0 no-underline">
            {recentPosts.map((post) => (
                <PostPreview key={post.slug} {...post} date={formatPostDate(post.date)} />
            ))}
        </div>
    );
}

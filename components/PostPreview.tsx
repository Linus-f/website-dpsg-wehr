import Link from 'next/link';
import { PostMetadata } from '@/types';

export default function PostPreview(props: PostMetadata) {
    return (
        <div>
            <Link href={`/posts/${props.slug}`}>
                <h2>{props.title}</h2>
                <p>{props.date}</p>
            </Link>
        </div>
    )
}

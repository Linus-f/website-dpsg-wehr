import Link from 'next/link';
import { PostMetadata } from '@/types';

export default function PostPreview(props: PostMetadata) {
    return (
        <div className='border border-slate-200 p-4 rounded-md shadow-md bg-white'>
            <Link href={`/posts/${props.slug}`}>
                <h2 className='font-bold hover:underline'>{props.title}</h2>
                <p className="text-sm text-slate-400">{props.date}</p>
            </Link>
        </div>
    )
}

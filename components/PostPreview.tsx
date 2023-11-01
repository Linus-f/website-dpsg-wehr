import Link from 'next/link';
import { PostMetadata } from '@/types';
import Image from 'next/image';

export default function PostPreview(props: PostMetadata) {
    return (
        /*<div className='border border-slate-200 dark:border-slate-800 p-4 rounded-md shadow-md dark:bg-gray-700'>
            <Link href={`/posts/${props.slug}`}>
                <Image fill src={props.image} alt="" sizes="100vw"/>
                <h2 className='font-bold hover:underline'>{props.title}</h2>
                <p className="text-sm text-slate-400">{props.date}</p>
            </Link>
        </div>*/
        <article className="mt-4 border shadow-sm hover:shadow-lg rounded-md dark:border-gray-600" key={props.slug}>
            <Link href={`/posts/${props.slug}`} className='flex flex-col h-full w-full'>
                <div className='relative flex-1'>
                    <img src={props.image} loading="lazy" alt={props.title}  className="w-full h-48 rounded-t-md bg-gray-100 text-gray-100 dark:bg-gray-600 dark:text-gray-600 object-cover" />
                    <div className="pt-3 ml-4 mr-2 mb-3">
                        <h3 className="text-xl text-gray-900 dark:text-white">
                            {props.title}
                        </h3>
                        <p className='text-gray-500 dark:text-gray-300 text-sm mt-1'>{props.desc}</p>
                    </div>
                </div>
                <div className="pt-3 ml-4 mr-2 mb-3 felx-1 flex flex-col">
                    <p className='text-gray-400 text-xs self-end'>{props.date}</p>
                </div>
            </Link>
        </article>
    )
}

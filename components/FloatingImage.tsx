import Img from '@/components/Img';

export default function FloatingImage({
    src,
    alt,
    width,
    height,
}: {
    src: string;
    alt: string;
    width: number;
    height: number;
}) {
    return (
        <div className="w-screen md:w-full md:prose-lg -mt-8 md:mt-0 mb-8 -mx-2 sm:-mx-4 md:mx-0">
            <Img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="object-cover w-screen md:mx-0 md:w-full max-h-[20rem] md:rounded-2xl shadow-sm shadow-black md:shadow-md md:shadow-black"
                priority={true}
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 896px"
            />
        </div>
    );
}

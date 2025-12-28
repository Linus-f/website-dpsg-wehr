import Img from '@/components/Img';
import ExportedImage from 'next-image-export-optimizer';

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
        <div className="relative w-screen md:w-full md:prose-lg -mt-8 md:mt-0 mb-8 -mx-2 sm:-mx-4 md:mx-0 h-[20rem] md:h-[28rem] overflow-hidden md:rounded-2xl shadow-sm shadow-black md:shadow-md md:shadow-black bg-gray-200 dark:bg-gray-800">
            {/* Background Blur Layer */}
            <ExportedImage
                src={src}
                alt=""
                width={width}
                height={height}
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-105"
                priority={true}
                sizes="(max-width: 768px) 100vw, 896px"
                aria-hidden="true"
            />

            {/* Foreground Content Layer */}
            <Img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="relative w-full h-full object-contain z-10"
                priority={true}
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 896px"
            />
        </div>
    );
}

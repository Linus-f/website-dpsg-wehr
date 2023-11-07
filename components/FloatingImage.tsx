import Img from "@/components/Img";

export default function FloatingImage({ src, alt, width, height } : { src: string, alt: string, width: number, height: number }) {

    return (
        <div className="w-screen md:w-full md:prose-lg -mt-8 md:mt-0 mb-8 -mx-4 md:mx-0">
            <Img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="object-cover md:mx-0 md:w-full max-h-[20rem] md:rounded-2xl md:shadow-md md:shadow-black"
        />
        </div>
    );
}
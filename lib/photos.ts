import type { PhotoPlus } from "@/types"
import sizeOf from "image-size"
import { getOptimizedUrl, getSrcSet } from "./photoSrc"


function getImageDimensions(src: string) {
    try {
        const dimensions = sizeOf(`public/${src}`);
        return dimensions;
    } catch (error) {
        return null;
    }
}

const photoInfo: {src: string, alt: string, tags: string[]}[] = [
    { src: "/images/jurtenaktion16/jurtenaktion_2016_01.png", alt: "", tags: ["1"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_02.png", alt: "", tags: ["1"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_03.png", alt: "", tags: ["1"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_04.png", alt: "", tags: ["1"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_05.png", alt: "", tags: ["2"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_06.png", alt: "", tags: ["1", "2"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_07.png", alt: "", tags: ["3"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_08.png", alt: "", tags: ["3"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_09.png", alt: "", tags: ["3"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_10.png", alt: "", tags: ["3"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_11.png", alt: "", tags: ["3"] }
]


export async function getPhotos() {
    
    const photos = photoInfo.map((info) => {
        const dimensions = getImageDimensions(info.src);
        if (dimensions === null || dimensions.width == undefined || dimensions.height == undefined) return;

        return {
            src: info.src,
            optimizedSrc: getOptimizedUrl(info.src, dimensions.width),
            width: dimensions.width,
            height: dimensions.height,
            alt: info.alt,
            srcSet: getSrcSet(info.src, dimensions.width, dimensions.height),   
            tags: info.tags,
        }
    }).filter((photo) => photo !== undefined) as PhotoPlus[];

    return photos;
}
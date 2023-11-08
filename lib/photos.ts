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
    { src: "/images/lager18/wutach01.png", alt: "Bau des Roversbaus", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach02.png", alt: "Pfadis bauen ihre Essensstelle", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach03.png", alt: "Kochen unter der Essenstelle", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach04.png", alt: "Essenstelle der Wölflinge", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach05.png", alt: "Pizzaofen", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach06.png", alt: "Knotenkunde bei der Ringausbildung", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach07.png", alt: "Lagerplatz", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach08.png", alt: "Wölflinge beim Spielen", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach09.png", alt: "Lagerfest rund ums Lagerfeuer", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach10.png", alt: "Pfadis beim Wandern in der Wutachschlucht", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach11.png", alt: "Pfadis in der Wutachschlucht", tags: ["Lager", "2018"] },
    { src: "/images/lager18/wutach12.png", alt: "Gruppenbild am Bannermast", tags: ["Lager", "2018"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_01.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_02.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_03.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_04.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_05.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_06.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_07.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_08.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_09.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_10.png", alt: "", tags: ["Jurtenaktion", "2016"] },
    { src: "/images/jurtenaktion16/jurtenaktion_2016_11.png", alt: "", tags: ["Jurtenaktion", "2016"] },
];

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
"use client";

import PhotoAlbum from "react-photo-album"
import NextPhotoRenderer from "./NextPhotoRenderer"
import { PhotoPlus, TagGroup } from "@/types"
import { useContext, useEffect, useState } from "react";
import { LightboxContext } from "@/lib/LightboxContext";
import GalleryHeader from "@/components/GalleryHeader";

const tagsInit: TagGroup[] = [
    {
        name: "Jahr",
        tags: ["2018", "2017", "2016"],
        selectedTags: [],
    },
    {
        name: "Aktion",
        tags: ["Lager", "Jurtenaktion"],
        selectedTags: [],
    },
    {
        name: "Gruppe",
        tags: ["Wölflinge", "Jungpfadfinder", "Pfadfinder", "Rover", "Leiter"],
        selectedTags: [],
    }
];

export default function PhotoAlbumWrapper({ photos } : { photos: PhotoPlus[] }) {
    const { setSlides } = useContext(LightboxContext);
    const [mounted, setMounted] = useState(false);
    const [fileredPhotos, setFilteredPhotos] = useState<PhotoPlus[]>([]);
    const [tags, setTags] = useState<TagGroup[]>(tagsInit);

    useEffect(() => {
        if (!mounted) return setMounted(true);

        const filtered = photos.filter((photo: PhotoPlus) => (
            tags.every((group: TagGroup) => (
                group.selectedTags == undefined ||
                group.selectedTags.length == 0 ||
                group.selectedTags.some((tag: string) => photo.tags!.includes(tag))
            ))
        ));

        setFilteredPhotos(filtered);

        setSlides(filtered.map((photo: PhotoPlus) => ({
            src: photo.src,
            alt: photo.alt,
            title: photo.alt,
            width: photo.width,
            height: photo.height,
            //srcSet: photo.srcSet,
        })));
    }, [mounted, tags]);

    return (
        <div>
            <GalleryHeader tags={tags} setTags={setTags}/>
            <PhotoAlbum
                photos={fileredPhotos}
                layout="rows"
                renderPhoto={NextPhotoRenderer}
                sizes={{
                    size: "896px",
                    sizes: [
                        { viewport: "(max-width: 896px)", size: "calc(100vw - 32px)" },
                        { viewport: "(max-width: 559px)", size: "calc(100vw - 16px)" },
                    ]
                }}
            />
        </div>
    );
}

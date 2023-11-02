"use client";

import PhotoAlbum from "react-photo-album"
import NextPhotoRenderer from "./NextPhotoRenderer"
import { PhotoPlus } from "@/types"
import { useContext, useEffect, useState } from "react";
import { LightboxContext } from "@/lib/LightboxContext";

export default function PhotoAlbumWrapper({ photos, tags } : { photos: PhotoPlus[], tags: string[] }) {
    const { setSlides } = useContext(LightboxContext);
    const [mounted, setMounted] = useState(false);
    const [fileredPhotos, setFilteredPhotos] = useState<PhotoPlus[]>([]);

    useEffect(() => {
        if (!mounted) return setMounted(true);

        const filtered = photos.filter((photo: PhotoPlus) => (tags.length === 0 || (photo.tags && tags.every((tag: string) => photo.tags!.includes(tag)))));
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
        <PhotoAlbum
            photos={fileredPhotos}
            layout="rows"
            renderPhoto={NextPhotoRenderer}
            sizes={{
                size: "calc(100vw - 32px)",
                sizes: [
                    { viewport: "(max-width: 559px)", size: "calc(100vw - 16px)" },
                ]
            }}
        />
    );
}

"use client";

import PhotoAlbum from "react-photo-album"
import NextPhotoRenderer from "./NextPhotoRenderer"
import { PhotoPlus } from "@/types"
import { useContext, useEffect, useState } from "react";
import { LightboxContext } from "@/lib/LightboxContext";

export default function PhotoAlbumWrapper({ photos } : { photos: PhotoPlus[] }) {
    const { setSlides } = useContext(LightboxContext);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) return setMounted(true);

        setSlides(photos.map((photo: PhotoPlus) => ({
            src: photo.src,
            alt: photo.alt,
            title: photo.alt,
            //srcSet: photo.srcSet,
        })));
    }, [mounted]);


    return (
        <PhotoAlbum
            photos={photos}
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

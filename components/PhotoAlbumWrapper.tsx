"use client";

import PhotoAlbum from "react-photo-album"
import NextPhotoRenderer from "./NextPhotoRenderer"
import { PhotoPlus } from "@/types"
import type { Photo } from "react-photo-album"
import { useContext, useEffect } from "react";
import { LightboxContext } from "@/lib/LightboxContext";

export default function PhotoAlbumWrapper({ photos } : { photos: Photo[] }) {
    const { setSlides } = useContext(LightboxContext);

    useEffect(() => {
        setSlides(photos.map((photo: Photo) => ({
            src: photo.src,
            alt: photo.alt,
            title: photo.alt,
        })));
    }, []);


    return (
        <PhotoAlbum
            photos={photos}
            layout="rows"
            renderPhoto={NextPhotoRenderer}
            sizes={{
                size: "732px",
                sizes: [
                    { viewport: "(max-width: 559px)", size: "calc(100vw - 16px)" },
                    { viewport: "(max-width: 763px)", size: "calc(100vw - 32px)" },
                ]
            }}
        />
    );
}
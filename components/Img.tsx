"use client";

import ExportedImage, { ExportedImageProps } from "next-image-export-optimizer";
import { HTMLProps, useState } from "react";

export default function Img(props: ExportedImageProps) {
    const [blur, setBlur] = useState(true);

    return (
        <ExportedImage
            {...(props as ExportedImageProps)}
            className={`${props.className} ${blur ? "filter blur-sm" : "animate-unblur"}`}
            onLoadingComplete={() => setBlur(false)}
        />
    )
} 
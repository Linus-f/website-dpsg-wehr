import ExportedImage from "next-image-export-optimizer";
import type { RenderImageContext, RenderImageProps } from "react-photo-album";
import { useContext } from "react";
import { LightboxContext } from "@/lib/LightboxContext";
import Img from "./Img";

export default function NextPhotoRenderer(
    { alt, title, sizes, className, onClick, style }: RenderImageProps,
    { photo }: RenderImageContext
) {
    const { setOpen } = useContext(LightboxContext);

    return (
        <Img
            src={photo}
            onClick={(event) => {
                onClick?.(event);
                setOpen(photo.src);
            }}
            placeholder={"blurDataURL" in photo ? "blur" : undefined}
            alt={alt || ""}
            title={title}
            sizes={sizes}
            className={className}
            width={photo.width}
            height={photo.height}
            style={{ ...style, cursor: "pointer" }}
        />
    );
}

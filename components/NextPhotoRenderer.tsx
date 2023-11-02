import ExportedImage from "next-image-export-optimizer";
import type { RenderPhotoProps } from "react-photo-album";
import { useContext } from "react";
import { LightboxContext } from "@/lib/LightboxContext";

export default function NextPhotoRenderer({ 
    photo, 
    imageProps: { alt, title, sizes, className, onClick },
    wrapperStyle,
} : RenderPhotoProps) {
    const { setOpen } = useContext(LightboxContext);

    return (
        <div style={{ ...wrapperStyle, position: "relative" }} className="cursor-pointer">
            <ExportedImage
                fill
                src={photo}
                onClick={() => setOpen(photo.src)}
                placeholder={"blurDataURL" in photo ? "blur" : undefined}
                {...{ alt, title, sizes, className }}
            />
        </div>
    );
}

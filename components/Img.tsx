import ExportedImage, { ExportedImageProps } from "next-image-export-optimizer";

export default function Img(props: ExportedImageProps) {
    // For now, we drop the JS-based blur-up to make this a server component.
    // We can still use CSS animations if needed.
    return (
        <ExportedImage
            {...(props as ExportedImageProps)}
            className={`${props.className} ${!props.priority ? "animate-unblur" : ""}`}
        />
    )
}
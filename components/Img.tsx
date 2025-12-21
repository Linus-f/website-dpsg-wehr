import ExportedImage, { ExportedImageProps } from "next-image-export-optimizer";

export default function Img(props: ExportedImageProps) {
    // For now, we drop the JS-based blur-up to make this a server component.
    // We can still use CSS animations if needed.
    return (
        <ExportedImage
            {...(props as ExportedImageProps)}
            className={`${props.className} ${!props.priority ? "animate-unblur" : ""}`}
            // Add attributes for the lightbox to pick up
            data-lightbox="true"
            data-src={props.src}
            data-alt={props.alt}
            data-width={props.width}
            data-height={props.height}
        />
    )
}
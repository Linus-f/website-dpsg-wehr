import ExportedImage, { ExportedImageProps } from 'next-image-export-optimizer';

function getSrc(src: ExportedImageProps['src']): string {
    if (typeof src === 'string') return src;
    if (src && typeof src === 'object') {
        if ('src' in src) return (src as { src: string }).src;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ('default' in src) return (src as any).default.src;
    }
    return '';
}

export default function Img(props: ExportedImageProps) {
    if (!props.src) return null;

    // For now, we drop the JS-based blur-up to make this a server component.
    // We can still use CSS animations if needed.
    return (
        <ExportedImage
            {...(props as ExportedImageProps)}
            className={`${props.className} ${!props.priority ? 'animate-unblur' : ''}`}
            // Add attributes for the lightbox to pick up
            data-lightbox="true"
            data-src={getSrc(props.src)}
            data-alt={props.alt}
            data-width={props.width}
            data-height={props.height}
        />
    );
}

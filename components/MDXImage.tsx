"use client"

import { DetailedHTMLProps, ImgHTMLAttributes, useContext, useEffect, useState } from "react";
import { LightboxContext } from "@/lib/LightboxContext";
import { getSrcSet } from "@/lib/photoSrc";
import Img from "./Img";

export default function MDXImage(props:  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & { priority?: boolean | string, fetchPriority?: "high" | "low" | "auto" }) {
    const { setOpen, addSlide, slides } = useContext(LightboxContext);
    const [ mounted, setMounted ] = useState(false);
    
    useEffect(() => {
        if (!mounted || !props.src) return;

        var hasSlide = false;
        slides.forEach(element => {
            hasSlide = hasSlide || element.src == props.src;
        });

        if (hasSlide) return;

        const w = typeof props.width === 'string' ? parseInt(props.width) : (props.width as number);
        const h = typeof props.height === 'string' ? parseInt(props.height) : (props.height as number);

        // In development, the optimized images don't exist yet, so we skip the srcSet
        // to avoid 404s in the lightbox.
        const isDev = process.env.NODE_ENV === 'development';
        const slideSrcSet = (!isDev && w && h) ? getSrcSet(props.src as string, w, h) : undefined;

        addSlide({ 
            src: props.src as string, 
            alt: (props.alt || props.title || "") as string,
            title: (props.title || props.alt || "") as string,
            srcSet: slideSrcSet
        });
    }, [slides, mounted, addSlide, props.src, props.alt, props.width, props.height, props.title]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isPriority = props.priority === true || props.priority === "true";

    return (
        <Img
            src={props.src as string}
            alt={(props.alt || props.title || "") as string}
            width={props.width as any}
            height={props.height as any}
            id={props.src as string}
            onClick={() => setOpen(props.src as string)}
            className="object-contain h-auto max-w-full transition duration-300 drop-shadow-xl hover:drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)] cursor-pointer"
            placeholder="blur"
            priority={isPriority}
            fetchPriority={props.fetchPriority}
            sizes="(max-width: 896px) 100vw, 896px"
        />
    );
}
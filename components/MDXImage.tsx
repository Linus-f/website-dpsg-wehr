"use client"

import { DetailedHTMLProps, ImgHTMLAttributes, useContext, useEffect, useState } from "react";
import ExportedImage from "next-image-export-optimizer";
import { LightboxContext } from "@/lib/LightboxContext";

export default function MDXImage(props:  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
    const { setOpen, addSlide, slides } = useContext(LightboxContext);
    const [ mounted, setMounted ] = useState(false);
    
    useEffect(() => {
        if (!mounted) return;

        var hasSlide = false;
        slides.forEach(element => {
            hasSlide = hasSlide || element.src == props.src;
        });

        if (hasSlide) return;

        addSlide({ 
            src: props.src as string, 
            alt: props.alt as string,
            title: props.alt as string,
        });
    }, [slides]);

    useEffect(() => (
        setMounted(true)
    ), []);

    return (
        <ExportedImage
            src={props.src as string}
            alt={props.alt as string}
            width={870}
            height={1160}
            id={props.src as string}
            onClick={() => setOpen(props.src as string)}
            className="object-contain h-auto max-w-full transition duration-300 drop-shadow-xl hover:drop-shadow-2xl hover:scale-105"
            placeholder="blur"
        />
    );
}
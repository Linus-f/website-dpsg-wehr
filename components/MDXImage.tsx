"use client"

import { DetailedHTMLProps, ImgHTMLAttributes, useContext, useEffect, useState } from "react";
import { LightboxContext } from "@/lib/LightboxContext";
import { getSrcSet } from "@/lib/photoSrc";
import Img from "./Img";

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
            srcSet: getSrcSet(props.src as string, props.width as number, props.height as number)
        });
    }, [slides, mounted, addSlide, props.src, props.alt, props.width, props.height]);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Img
            src={props.src as string}
            alt={props.alt as string}
            width={props.width as number}
            height={props.height as number}
            id={props.src as string}
            onClick={() => setOpen(props.src as string)}
            className="object-contain h-auto max-w-full transition duration-300 drop-shadow-xl hover:drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)] cursor-pointer"
            placeholder="blur"
        />
    );
}
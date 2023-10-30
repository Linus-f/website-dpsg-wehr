"use client";

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { LightboxContext } from '@/lib/LightboxContext';
import NextImageRenderer from '@/components/NextImageRenderer';
import  { usePathname } from 'next/navigation';

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css"

export default function PageLayout({children}: {children: React.ReactNode}) {
    const [open, setOpen] = useState(false);
    const [slides, setSlides] = useState<SlideImage[]>([]); // [{ src: "/images/gruppenbild.png" }
    const [lightBoxOpen, setLightboxOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const dynamicRoute = usePathname();

    useEffect(() => setSlides([]), [dynamicRoute]);

    const toggleOpen = () => setOpen(!open);
    const addSlide = (slide: SlideImage) => {
    
        if (!slides) {
            setSlides([slide]);
        } else {
            setSlides([slide, ...slides]);
        }
    }

    const openLightbox = (src: string) => {
        slides.forEach((slide, i) => {
            if (slide.src == src) {
                setIndex(i);
            }
        });

        setLightboxOpen(true);
    }

    return (
        <LightboxContext.Provider value={{ open: lightBoxOpen, setOpen: openLightbox, slides: slides, addSlide: addSlide }}>
            <div>
                <Navbar sidebarOpened={open} toggleSidebar={toggleOpen} />
                <div className="flex flex-col h-[calc(100vh-56px)] overflow-auto justify-between">
                    <Sidebar isOpen={open} toggle={toggleOpen} />
                    <div className="md:mx-auto md:max-w-4xl px-6 my-8 relative">
                        {children}
                    </div>
                    <Footer />

                    <Lightbox
                        open={lightBoxOpen}
                        close={() => setLightboxOpen(false)}
                        slides={slides}
                        render={{ slide: NextImageRenderer }}
                        index={index}
                        plugins={[Fullscreen, Captions]}
                    />
                </div>
            </div>
        </LightboxContext.Provider>
    );
}
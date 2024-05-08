"use client";

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { LightboxContext } from '@/lib/LightboxContext';
import  { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css"
import { MantineProvider } from '@mantine/core';

export default function PageLayout({children}: {children: React.ReactNode}) {
    const [open, setOpen] = useState(false);
    const [slides, setSlides] = useState<SlideImage[]>([]);
    const [lightBoxOpen, setLightboxOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const { theme } = useTheme();

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
        <MantineProvider forceColorScheme={theme as "light" | "dark" | undefined}>
            <LightboxContext.Provider
                value={{
                    open: lightBoxOpen,
                    setOpen: openLightbox,
                    slides: slides,
                    addSlide: addSlide,
                    setSlides: setSlides,
                }}
            >
                <div>
                    <Navbar sidebarOpened={open} toggleSidebar={toggleOpen} />
                    <div className="flex flex-col h-[calc(100vh-56px)] overflow-auto justify-between">
                        <Sidebar isOpen={open} toggle={toggleOpen} />
                        <div className="max-w-4xl mx-0 px-2 sm:px-4 md:mx-auto my-12 md:my-20 relative flex-1">
                            {children}
                        </div>
                        <Footer />

                        <Lightbox
                            open={lightBoxOpen}
                            close={() => setLightboxOpen(false)}
                            slides={slides}
                            /*render={{ slide: NextLightboxRenderer }}*/
                            index={index}
                            plugins={[Fullscreen, Captions, Zoom]}
                           
                        />
                    </div>
                </div>
            </LightboxContext.Provider>
        </MantineProvider>
    );
}

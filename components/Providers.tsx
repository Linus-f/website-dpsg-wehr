'use client';

import { ThemeProvider } from 'next-themes';
import { LightboxContext } from '@/lib/LightboxContext';
import { useState, useEffect } from 'react';
import { SlideImage } from 'yet-another-react-lightbox';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const LightboxWrapper = dynamic(() => import('./LightboxWrapper'), { ssr: false });

export default function Providers({ children }: { children: React.ReactNode }) {
    const [slides, setSlides] = useState<SlideImage[]>([]);
    const [lightBoxOpen, setLightboxOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        if (lightBoxOpen) {
            setLightboxOpen(false);
            setSlides([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const openLightbox = (src: string) => {
        const images = document.querySelectorAll('img[data-lightbox="true"]');
        const newSlides: SlideImage[] = Array.from(images).map((img) => {
            const htmlImg = img as HTMLImageElement;
            return {
                src: htmlImg.dataset.src || htmlImg.src,
                alt: htmlImg.dataset.alt || htmlImg.alt,
                title: htmlImg.dataset.alt || htmlImg.alt,
                width: htmlImg.dataset.width ? parseInt(htmlImg.dataset.width) : undefined,
                height: htmlImg.dataset.height ? parseInt(htmlImg.dataset.height) : undefined,
            };
        });

        setSlides(newSlides);

        let targetIndex = newSlides.findIndex((slide) => slide.src === src);
        if (targetIndex === -1) {
            targetIndex = newSlides.findIndex(
                (slide) => slide.src.endsWith(src) || src.endsWith(slide.src)
            );
        }

        if (targetIndex !== -1) {
            setIndex(targetIndex);
        }
        setLightboxOpen(true);
    };

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const lightboxTrigger = target.closest('[data-lightbox="true"]');
            if (lightboxTrigger) {
                const src =
                    lightboxTrigger.getAttribute('data-src') ||
                    (lightboxTrigger as HTMLImageElement).src;
                if (src) {
                    openLightbox(src);
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <ThemeProvider attribute="class">
            <LightboxContext.Provider
                value={{
                    open: lightBoxOpen,
                    setOpen: openLightbox,
                    slides: slides,
                    addSlide: (s) => setSlides((prev) => [s, ...prev]),
                    setSlides: setSlides,
                }}
            >
                {children}
                {lightBoxOpen && (
                    <LightboxWrapper
                        open={lightBoxOpen}
                        setOpen={setLightboxOpen}
                        slides={slides}
                        index={index}
                    />
                )}
            </LightboxContext.Provider>
        </ThemeProvider>
    );
}

import { createContext } from 'react';
import { SlideImage } from 'yet-another-react-lightbox';

export const LightboxContext = createContext({
    open: false,
    setOpen: (_src: string) => {},
    slides: [] as SlideImage[],
    addSlide: (_slide: SlideImage) => {},
    setSlides: (_slides: SlideImage[]) => {},
});

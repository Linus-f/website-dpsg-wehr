import { createContext } from "react";
import { SlideImage } from "yet-another-react-lightbox";

export const LightboxContext = createContext({
    open: false, 
    setOpen: (src: string) => {},
    slides: [] as SlideImage[],
    addSlide: (slide: SlideImage) => {},
    setSlides : (slides: SlideImage[]) => {},
});



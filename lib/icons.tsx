import Lilie from "@/components/Lilie";

export type Icons = 'Lilie' | 'None' | 'News' | 'People' | 'Image' | 'Calendar' | 'Help' | 'House'

export const getIconFromname = (iconsName: Icons, color?: string): React.JSX.Element | null =>  {
    switch (iconsName) {
        case "Lilie":
            return <Lilie color={color}/>;
        case "News":
            return (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M368 48H144a64.07 64.07 0 00-64 64v352a48.05 48.05 0 0048 48h256a48.05 48.05 0 0048-48V112a64.07 64.07 0 00-64-64zM128 464a16 16 0 01-16-16v-16h272v16a16 16 0 01-16 16zm288-64H96V112a32.09 32.09 0 0132-32h240a32.09 32.09 0 0132 32z"></path>
                    <path d="M160 144h192v32H160zm0 80h192v32H160zm0 80h112v32H160z"></path>
                </svg>
            );
        case "People":
            return (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66.05-72c-3-41.35 26.91-72 59.88-72h12.31c32.93 0 62.83 30.65 59.86 72zM320 256c-33.07 0-108.2 14.13-142.06 31.19-5.45 2.74-14.5 4-25.94 4s-20.49-1.26-25.94-4C92.2 270.13 17.07 256-16 256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32V288c0-17.67-14.33-32-32-32z"></path>
                </svg>
            );
        case "Image":
            return (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M416 64H96a64.07 64.07 0 00-64 64v256a64.07 64.07 0 0064 64h320a64.07 64.07 0 0064-64V128a64.07 64.07 0 00-64-64zm-80 64a48 48 0 1 1-48 48 48.05 48.05 0 0 1 48-48zM96 416a32.09 32.09 0 0 1-32-32v-76.73l94.47-101.1a32.35 32.35 0 0 1 47.06 0L288 293.39l-47.06 50.42a32.35 32.35 0 0 0 0 47.06L272.11 416zm352-32a32.09 32.09 0 0 1-32 32H317.39l-61.4-65.79a16.18 16.18 0 0 1 0-23.53L303.05 276.3a16.18 16.18 0 0 1 23.53 0L448 406.73z"></path>
                </svg>
            );
        case "Calendar":
            return (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="none" strokeMiterlimit="10" strokeWidth="32" x="48" y="80" width="416" height="384" rx="48"></rect>
                    <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M128 48v32m256-32v32m80 80H48"></path>
                </svg>
            );
        case "Help":
            return (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 80c-105.87 0-192 86.13-192 192s86.13 192 192 192 192-86.13 192-192-86.13-192-192-192zm0 348c-86.02 0-156-69.98-156-156s69.98-156 156-156 156 69.98 156 156-69.98 156-156 156zm0-222c-27.57 0-50 22.43-50 50v12h-36v-12c0-47.42 38.58-86 86-86s86 38.58 86 86c0 29.83-24.32 55.15-46.11 72.52-14.47 11.53-21.89 24.53-23.89 39.48h-36c2.02-22.13 12.15-39.93 29.89-54.02 21.44-17.06 40.11-32.76 40.11-58 0-27.57-22.43-50-50-50zm0 160a24 24 0 1 1 24-24 24 24 0 0 1-24 24z"></path>
                </svg>
            );
        case "House":
            return (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 25.5-12.9 48.1-32.7 64.1V512H96.2v-32.1c-19.8-16-32.7-38.6-32.7-64.1l.7-160.2H32.2c-17 0-32-14.1-32-32.1 0-9 3-17 10-24.1l244.1-207.8c16-13.6 40-13.6 56 0l244.1 207.8c11.4 10.1 11.4 27.1 1.4 37.1zM288 160a64 24 0 1 0 0 128 64 24 0 1 0 0-128z"></path>
                </svg>
            );
        default:
            return null;
    }
}
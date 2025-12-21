"use client";

import dynamic from 'next/dynamic';

const GalleryHeader = dynamic(() => import('./GalleryHeader'), {
    ssr: false,
});

export default GalleryHeader;

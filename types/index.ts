import { Photo } from "react-photo-album";

export interface PostMetadata {
    title: string;
    date: string;
    subtitle: string;
    author: string;
    slug: string;
    image: string;
    desc: string;
}

export interface ArcostData {
    left: string;
    middle: string;
    right: string;
}

export interface PhotoPlus extends Photo {
    tags?: string[];
}

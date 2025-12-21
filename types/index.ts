import { Photo } from "react-photo-album";

export interface PostMetadata {
    title: string;
    date: string;
    subtitle: string;
    author: string;
    slug: string;
    image: {
        src: string;
        width: number;
        height: number;
    }
    desc: string;
}

export interface ArcostData {
    left: string;
    middle: string;
    right: string;
}

export interface PhotoPlus extends Photo {
    tags?: string[];
    optimizedSrc?: string;
}

export interface TagGroup {
    name: string;
    tags: string[];
    selectedTags: string[];
}

export interface AppEvent {
    title: string;
    start: string; // YYYY-MM-DD
    end?: string; // YYYY-MM-DD, exclusive
}

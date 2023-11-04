import { ArcostData } from "@/types";
import {
    IoNewspaper,
    IoPeople,
    IoImage
} from "react-icons/io5"

export interface NavigationLinkGroup {
    label: string;
    link: string;
    Icon?: React.FC<any>;
    links?: Array<NavigationLink>;
}

export interface NavigationLink {
    label: string;
    link: string;
}

export const navigationLinks: Array<NavigationLinkGroup> = [
    { label: "Aktuelles", link: "/aktuelles", Icon: IoNewspaper },
    { label: "Gruppen", link: "", Icon: IoPeople, links: [
        { label: "Wölflinge", link: "/pages/gruppen/woelflinge" },
        { label: "Jungpfadfinder", link: "/pages/gruppen/jungpfadfinder" },
        { label: "Pfadfinder", link: "/pages/gruppen/pfadfinder" },
        { label: "Rover", link: "/pages/gruppen/rover" },
        { label: "Leiterrunde", link: "/pages/gruppen/leiter" }
    ]},
    { label: "Gallerie", link: "/gallerie", Icon: IoImage },
]

export const acrostData: ArcostData[] = [
    { left: "", middle: "L", right: "uschdig "},
    { left: "", middle: "E", right: "n ganz bunte Huufe"},
    { left: "Fasz", middle: "I", right: "niert vom Pfadfinder sii"},
    { left: "Allzeit berei", middle: "T", right: ""},
    { left: "J", middle: "E", right: "di Alterstufe"},
    { left: "Natü", middle: "R", right: "lich"},
    { left: "mit G", middle: "R", right: "uppenkindern"},
    { left: "", middle: "U", right: "nterwegs"},
    { left: "Gemei", middle: "N", right: "schaftlich"},
    { left: "", middle: "D", right: ""},
    { left: "ein bissch", middle: "E", right: "n verrückt"},
]
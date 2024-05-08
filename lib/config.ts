import { ArcostData } from "@/types";
import {
    IoNewspaper,
    IoPeople,
    IoImage,
    IoCalendarOutline as CalendarIcon,
    IoHelpCircle as QuestionIcon,
} from "react-icons/io5"

import { FaHouseChimney } from "react-icons/fa6"

import { Icons } from "@/lib/icons";

export interface NavigationLinkGroup {
    label: string;
    link: string;
    Icon?: React.FC<any>;
    links?: Array<NavigationLink>;
}

export interface NavigationLink {
    label: string;
    link: string;
    Icon: Icons;
    color?: string;
}

export const navigationLinks: Array<NavigationLinkGroup> = [
    { label: "News", link: "/news", Icon: IoNewspaper },
    { label: "Gruppen", link: "", Icon: IoPeople, links: [
        { label: "Wölflinge", link: "/pages/gruppen/woelflinge", Icon:  "Lilie", color: "#ec661a"},
        { label: "Jungpfadfinder", link: "/pages/gruppen/jungpfadfinder", Icon: "Lilie", color: "#2d54a1" },
        { label: "Pfadfinder", link: "/pages/gruppen/pfadfinder", Icon: "Lilie", color: "#08833c" },
        { label: "Rover", link: "/pages/gruppen/rover", Icon: "Lilie", color: "#cc1e2f" },
        { label: "Leiterrunde", link: "/pages/gruppen/leiter", Icon: "Lilie", color: "#FFC107" }
    ]},
    { label: "Fotos", link: "/gallerie", Icon: IoImage },
    { label: "Termine", link: "/pages/termine", Icon: CalendarIcon },
    { label: "Hütten", link: "", Icon: FaHouseChimney, links: [
        { label: "St. Raphael", link: "https://www.pfadfinderheim-st-raphael.de/", Icon: "None" },
        { label: "Pfadfinderhaus Nöggenschwiel", link: "http://www.pfadfinderhaus-noeggenschwiel.de/", Icon: "None" },
    ]},
    { label: "FAQ", link: "/pages/faq", Icon: QuestionIcon },
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
    { left: "un", middle: "D", right: ""},
    { left: "ein bissch", middle: "E", right: "n verrückt"},
]
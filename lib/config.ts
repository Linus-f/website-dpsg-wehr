import {
    IoNewspaper,
    IoPeople
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
    ]}
]
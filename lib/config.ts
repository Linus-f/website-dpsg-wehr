export interface NavigationLinkGroup {
    label: string;
    link: string;
    links?: Array<NavigationLink>;
}

export interface NavigationLink {
    label: string;
    link: string;
}

export const naviagtionLinks: Array<NavigationLinkGroup> = [
    { label: "Aktuelles", link: "/aktuelles" },
    { label: "Gruppen", link: "", links: [
        { label: "Wölflinge", link: "/pages/gruppen/woelflinge" },
        { label: "Jungpfadfinder", link: "/pages/gruppen/jungpfadfinder" },
        { label: "Pfadfinder", link: "/pages/gruppen/pfadfinder" },
        { label: "Rover", link: "/pages/gruppen/rover" },
        { label: "Leiterrunde", link: "/pages/gruppen/leiter" }
    ]}
]
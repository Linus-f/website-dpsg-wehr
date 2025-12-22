import Link from "next/link";
import ToggleThemeButton from "./ToggleThemeButton";
import { navigationLinks } from "@/lib/config";
import ExportedImage from "next-image-export-optimizer";
import logo from "@/public/images/logo.png";
import { getIconFromname } from "@/lib/icons";
import NavbarClient from "./NavbarClient";
import SearchButton from "./SearchButton";

import { NavigationLinkGroup, NavigationLink } from "@/types";

export default function Navbar() {

    const renderedItems = navigationLinks.map((link: NavigationLinkGroup) => {
        if (link.links) {
            const menuItems = link.links?.map((item: NavigationLink) => {
                const Icon = getIconFromname(item.Icon, item.color);

                return (
                    <Link
                        key={item.link}
                        href={item.link}
                        className="leading-none py-2 px-2 font-light hover:bg-gray-200 dark:hover:bg-gray-600 rounded dark:text-white flex flex-row items-center whitespace-nowrap"
                    >
                        <div className="w-5 h-5 mr-2 flex items-center justify-center">
                            {Icon}
                        </div>
                        {item.label}
                    </Link>
                );
            });

            return (
                <div key={link.label} className="relative group">
                    <Link
                        href={link.link}
                        className="leading-none py-2 px-1.5 md:px-2 lg:px-3 font-light hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex flex-row items-center"
                    >
                        <span className="mr-1">{link.label}</span>
                        <div className="mt-1 text-gray-600 dark:text-white">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="m112 184 144 144 144-144"></path>
                            </svg>
                        </div>
                    </Link>
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 pt-2 hidden group-hover:block w-auto min-w-[200px] z-50">
                         <div className="bg-white dark:bg-gray-700 shadow-lg border border-gray-100 dark:border-gray-600 rounded p-1 flex flex-col gap-1">
                            {menuItems}
                         </div>
                    </div>
                </div>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.link}
                className="block leading-none py-2 px-1.5 md:px-2 lg:px-3 font-light rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
                {link.label}
            </Link>
        );
    });

    return (
        <header className="h-[72px] px-4 shadow-md sticky top-0 z-50 dark:bg-gray-700 bg-gray-50">
            <div className="h-full flex justify-between items-center max-w-6xl mx-auto">
                <div className="flex items-center gap-2 md:gap-4">
                    <NavbarClient />
                    <Link href="/">
                        <div className="flex flex-row items-center">
                            <ExportedImage priority width={60} height={60} src={logo} alt="Logo" />
                            <h1 className="font-bold text-lg ml-2 hidden min-[400px]:block overflow-auto">Pfadfinder Wehr</h1>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-1 md:gap-2 lg:gap-4">
                    <div className="hidden min-[840px]:flex flex-row gap-0.5 md:gap-1 lg:gap-2 items-center mr-1 md:mr-2 lg:mr-4">
                        {renderedItems}
                    </div>
                    <SearchButton />
					<ToggleThemeButton />
                </div>
            </div>
        </header>
    );
}

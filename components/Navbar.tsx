import {
    IoChevronDownOutline as ChevronDown,
} from "react-icons/io5";
import Link from "next/link";
import ToggleThemeButton from "./ToggleThemeButton";
import { navigationLinks } from "@/lib/config";
import ExportedImage from "next-image-export-optimizer";
import logo from "@/public/images/logo.png";
import { getIconFromname } from "@/lib/icons";
import NavbarClient from "./NavbarClient";

export default function Navbar() {

    const items = navigationLinks.map((link) => {
        const menuItems = link.links?.map((item) => {
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

        if (menuItems) {
            return (
                <div key={link.label} className="relative group">
                    <Link
                        href={link.link}
                        className="leading-none py-2 px-3 font-light hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex flex-row items-center"
                    >
                        <span className="mr-1">{link.label}</span>
                        <div className="mt-1 text-gray-600 dark:text-white">
                            <ChevronDown />
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
                className="block leading-none py-2 px-3 font-light rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
                {link.label}
            </Link>
        );
    });

    return (
        <header className="h-[72px] px-4 shadow-md sticky top-0 z-50 dark:bg-gray-700 bg-gray-50">
            <div className="h-full flex justify-between items-center max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <NavbarClient />
                    <Link href="/">
                        <div className="flex flex-row items-center">
                            <ExportedImage priority width={60} height={60} src={logo} alt="Logo" />
                            <h1 className="font-bold text-lg ml-2 collapse w-0 xs:w-auto xs:visible overflow-auto">Pfadfinder Wehr</h1>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-row gap-1 items-center">
                        {items}
                    </div>
					<ToggleThemeButton />
                </div>
            </div>
        </header>
    );
}

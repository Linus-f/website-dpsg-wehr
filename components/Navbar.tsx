"use client";

import { Group, Burger, Menu } from "@mantine/core";

import {
    IoChevronDownOutline as ChevronDown,
} from "react-icons/io5";
import Link from "next/link";
import ToggleThemeButton from "./ToggleThemeButton";
import { navigationLinks } from "@/lib/config";
import ExportedImage from "next-image-export-optimizer";
import logo from "@/public/images/logo.png";
import { getIconFromname } from "@/lib/icons";

export default function Navbar({sidebarOpened, toggleSidebar} : {sidebarOpened: boolean, toggleSidebar: () => void}) {

    const items = navigationLinks.map((link) => {
        const menuItems = link.links?.map((item) => {
            const Icon = getIconFromname(item.Icon, item.color);

            return (
            <Menu.Item key={item.link}>
                <Link
                    href={item.link}
                    className="leading-none py-2 px-2 font-light hover:bg-gray-200 dark:hover:bg-gray-500 rounded dark:text-white flex flex-row items-center"
                >
                    <div className="w-5 h-5 mr-2">
                        {Icon}
                    </div>
                    {item.label}
                </Link>
            </Menu.Item>
            );
        });

        if (menuItems) {
            return (
                <Menu
                    key={link.label}
                    trigger="hover"
                    transitionProps={{ exitDuration: 0 }}
                    withinPortal
                >
                    <Menu.Target>
                        <Link
                            href={link.link}
                            className="leading-none py-2 px-3 font-light hover:bg-gray-200 dark:hover:bg-gray-500 rounded flex flex-row items-center"
                        >
                                <span className="mr-1">{link.label}</span>
                                <div className="mt-1 text-gray-600 dark:text-white">
                                    <ChevronDown />
                                </div>

                        </Link>
                    </Menu.Target>
                <Menu.Dropdown className="dark:bg-gray-700 dark:border-slate-600">{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.link}
                className="block leading-none py-2 px-3 font-light rounded hover:bg-gray-200 dark:hover:bg-gray-500"
            >
                {link.label}
            </Link>
        );
    });

    return (
        <header className="h-[72px] px-4 shadow-md sticky top-0 z-50 dark:bg-gray-700 bg-gray-50">
            <div className="h-full flex justify-between items-center max-w-4xl mx-auto">
                <Group>
                    <Burger
                        opened={sidebarOpened}
                        onClick={toggleSidebar}
                        size="sm"
                        hiddenFrom="md"
                    />
                    <Link href="/">
                        <div className="flex flex-row items-center">
                            <ExportedImage priority width={60} height={60} src={logo} alt="Logo" />
                            <h1 className="font-bold text-lg ml-2 collapse w-0 xs:w-auto xs:visible overflow-auto">Pfadfinder Wehr</h1>
                        </div>
                    </Link>
                </Group>

                <Group className="flex" style={{'--group-wrap': 'nowrap'}}>
                    <Group ml={30} gap={5} visibleFrom="md" className="flex" style={{'--group-wrap': 'nowrap'}}>
                        {items}
                    </Group>
					<ToggleThemeButton />
                </Group>
            </div>
        </header>
    );
}

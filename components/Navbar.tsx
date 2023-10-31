"use client";

import { Autocomplete, Group, Burger, Menu, Center } from "@mantine/core";

import {
    IoSearchOutline as SearchIcon,
    IoChevronDownOutline as ChevronDown,
} from "react-icons/io5";
import Link from "next/link";
import ToggleThemeButton from "./ToggleThemeButton";
import { navigationLinks } from "@/lib/config";
import Image from "next/image";


export default function Navbar({sidebarOpened, toggleSidebar} : {sidebarOpened: boolean, toggleSidebar: () => void}) {

    const items = navigationLinks.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>
                <Link
                    href={item.link}
                    className="block leading-none py-2 px-3 font-light hover:bg-gray-100 dark:hover:bg-gray-500 rounded dark:text-white"
                >
                    {item.label}
                </Link>
            </Menu.Item>
        ));

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
                            className="block leading-none py-2 px-3 font-light hover:bg-gray-100 dark:hover:bg-gray-500 rounded"
                        >
                            <Center>
                                <span className="mr-1">{link.label}</span>
                                <div className="mt-1 text-gray-600 dark:text-white">
                                    <ChevronDown />
                                </div>
                            </Center>
                        </Link>
                    </Menu.Target>
                <Menu.Dropdown className="dark:bg-gray-700 dark:border-slate-800">{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.link}
                className="block leading-none py-2 px-3 font-light rounded hover:bg-gray-100 dark:hover:bg-gray-500"
            >
                {link.label}
            </Link>
        );
    });

    return (
        <header className="h-14 px-4 shadow-md sticky top-0 z-50 dark:bg-gray-700 bg-gray-50">
            <div className="h-14 flex justify-between items-center max-w-4xl mx-auto">
                <Group>
                    <Burger
                        opened={sidebarOpened}
                        onClick={toggleSidebar}
                        size="sm"
                        hiddenFrom="sm"
                    />
                    <Link href="/">
                        <div className="flex flex-row items-center">
                            <Image width={50} height={50} src="/images/logo.png" alt="Logo" />
                            <h1 className="font-bold text-lg ml-2 collapse w-0 xs:w-auto xs:visible">Pfadfinder Wehr</h1>
                        </div>
                    </Link>
                </Group>

                <Group>
                    <Group ml={50} gap={5} visibleFrom="sm">
                        {items}
                    </Group>
					<ToggleThemeButton />
                    {/*<Autocomplete
            placeholder="Search"
            leftSection={<div className='text-gray-400'><SearchIcon/></div>}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />*/}
                </Group>
            </div>
        </header>
    );
}

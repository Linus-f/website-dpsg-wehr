"use client";

import { Autocomplete, Group, Burger, Menu, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import {
    IoSearchOutline as SearchIcon,
    IoChevronDownOutline as ChevronDown,
} from "react-icons/io5";
import Link from "next/link";

const links = [
    { link: "/aktuelles", label: "Aktuelles" },
    {
        link: "#1",
        label: "Gruppen",
        links: [
            { link: "/gruppen/woelflinge", label: "Wölflinge" },
            { link: "/gruppen/jungpfadfinder", label: "Jungpfadfinder" },
            { link: "/gruppen/pfadfinder", label: "Pfadfinder" },
            { link: "/gruppen/rover", label: "Rover" },
            { link: "/gruppen/leiter", label: "Leiterrunde" },
        ],
    },
];

export default function Navbar() {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>
                <Link
                    href={item.link}
                    className="block leading-none py-2 px-3 font-light hover:bg-gray-100 rounded"
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
                            className="block leading-none py-2 px-3 font-light hover:bg-gray-100 rounded"
                        >
                            <Center>
                                <span className="mr-1">{link.label}</span>
                                <div className="mt-1 text-gray-600">
                                    <ChevronDown />
                                </div>
                            </Center>
                        </Link>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.link}
                className="block leading-none py-2 px-3 font-light hover:bg-gray-100 rounded"
            >
                {link.label}
            </Link>
        );
    });

    return (
        <header className="h-14 mb-28 px-4 border-b-2 border-solid">
            <div className="h-14 flex justify-between items-center max-w-4xl mx-auto">
                <Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        size="sm"
                        hiddenFrom="sm"
                    />
                    <Link href="/">
                        <h1 className="font-bold text-lg">Pfadfinder Wehr</h1>
                    </Link>
                </Group>

                <Group>
                    <Group ml={50} gap={5} visibleFrom="sm">
                        {items}
                    </Group>
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

"use client";

import { NavbarLinksGroup } from "./LinksGroup";
import { IoCloseOutline as IoClose } from "react-icons/io5";

export default function Sidebar({ isOpen, toggle }: { isOpen: boolean, toggle: () => void}) {
    return (
        <div className={`z-30 ${isOpen ? "h-[calc(100vh-72px)] overflow-y-auto" : "0px"} absolute min-w-full bg-gray-100 dark:bg-gray-700 ${isOpen ? "visible" : "collapse"}`} onClick={toggle}>
            <div className="flex justify-end p-4">
                <button onClick={toggle} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200">
                    <IoClose size={32} />
                </button>
            </div>
            <div onClick={e => e.stopPropagation()}>
                <NavbarLinksGroup toggleSidebar={toggle}/>
            </div>
        </div>
    )
}

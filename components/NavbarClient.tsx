"use client";

import {
    IoMenuOutline as IoMenu,
} from "react-icons/io5";

export default function NavbarClient() {
    const toggleSidebar = () => {
        window.dispatchEvent(new CustomEvent('toggle-sidebar'));
    };

    return (
        <button
            onClick={toggleSidebar}
            className="md:hidden p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
            aria-label="Toggle navigation"
        >
            <IoMenu size={24} />
        </button>
    );
}

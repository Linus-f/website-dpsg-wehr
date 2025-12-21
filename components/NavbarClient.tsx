"use client";

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
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 160h352M80 256h352M80 352h352"></path>
            </svg>
        </button>
    );
}

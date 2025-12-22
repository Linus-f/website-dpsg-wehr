'use client';

import { NavbarLinksGroup } from './LinksGroup';

export default function Sidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
    return (
        <div
            className={`z-30 ${isOpen ? 'h-[calc(100vh-72px)] overflow-y-auto' : '0px'} absolute min-w-full bg-gray-100 dark:bg-gray-700 ${isOpen ? 'visible' : 'collapse'}`}
            onClick={toggle}
        >
            <div className="flex justify-end p-4">
                <button
                    onClick={toggle}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                >
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="32"
                        width="32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                            d="M368 368L144 144m224 0L144 368"
                        ></path>
                    </svg>
                </button>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
                <NavbarLinksGroup toggleSidebar={toggle} />
            </div>
        </div>
    );
}

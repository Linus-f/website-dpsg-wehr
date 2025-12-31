'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

import { IoSunny } from 'react-icons/io5';
import { IoMdBonfire } from 'react-icons/io';

export default function ToggleThemeButton() {
    const [hasMounted, setHasMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        // We use this to prevent hydration mismatch for theme-dependent icons.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasMounted(true);
    }, []);

    const onToggleTheme = () => (currentTheme === 'dark' ? setTheme('light') : setTheme('dark'));

    return (
        <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 dark:text-white text-gray-800 w-10 h-10 flex items-center justify-center rounded text-xl ${!hasMounted && 'hidden'}`}
        >
            {hasMounted && currentTheme == 'dark' ? <IoMdBonfire /> : <IoSunny />}
        </button>
    );
}

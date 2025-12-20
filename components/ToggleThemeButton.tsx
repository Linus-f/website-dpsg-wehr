import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { IoSunny } from 'react-icons/io5'
import { IoMdBonfire } from 'react-icons/io'

export default function ToggleThemeButton() {
    const [hasMounted, setHasMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    useEffect(() => {
        // We use this to prevent hydration mismatch for theme-dependent icons.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasMounted(true);
    }, []);

    const onToggleTheme = () => theme == "dark" ? setTheme("light") : setTheme("dark");
    
    return (
        <div onClick={onToggleTheme}
            className={` hover:bg-gray-100 dark:hover:bg-gray-500 transition-all duration-100 dark:text-white text-gray-800 py-2 px-3 rounded text-xl ${!hasMounted && "hidden"}`}>
            {hasMounted && currentTheme == "dark" ? <IoMdBonfire /> : <IoSunny />}            
        </div>
    )

}

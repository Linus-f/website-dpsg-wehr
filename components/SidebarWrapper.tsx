'use client';

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

export default function SidebarWrapper() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const toggleSidebar = () => setSidebarOpen((prev) => !prev);
        const closeSidebar = () => setSidebarOpen(false);

        window.addEventListener('toggle-sidebar', toggleSidebar);
        window.addEventListener('close-sidebar', closeSidebar);
        return () => {
            window.removeEventListener('toggle-sidebar', toggleSidebar);
            window.removeEventListener('close-sidebar', closeSidebar);
        };
    }, []);

    return <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} />;
}

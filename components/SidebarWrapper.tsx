'use client';

import Sidebar from './Sidebar';
import { useSidebar } from '@/lib/SidebarContext';

export default function SidebarWrapper() {
    const { isOpen, close } = useSidebar();

    return <Sidebar isOpen={isOpen} toggle={close} />;
}

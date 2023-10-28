"use client";

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Sidebar from './Sidebar';
import { useState } from 'react';

export default function PageLayout({children}: {children: React.ReactNode}) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);

    return (
        <div>
            <Navbar sidebarOpened={open} toggleSidebar={toggleOpen} />
            <div className="flex flex-col h-[calc(100vh-56px)] overflow-auto justify-between">
                <Sidebar  isOpen={open}/>
                <div className="md:mx-auto md:max-w-4xl px-6 my-8 relative">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@mantine/core/styles.css'

import { MantineProvider, ColorSchemeScript } from '@mantine/core'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DPSG Wehr',
    description: 'Website der DPSG Wehr',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const header = (
        <header className="mx-auto max-w-2xl">
            <div className="text-center bg-slate-800 p-8 my-6 rounded-md">
                <Link href="/">
                    <h1 className='text-3xl font-bold text-white'>Pfadfinder Wehr</h1>
                </Link>
            </div>
        </header>
    );


    return (
        <html lang="de">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={inter.className}>
                <MantineProvider>
                    <div className="flex flex-col h-screen justify-between">
                        <Navbar />
                        <div className="mx-auto max-w-4xl px-6 mb-auto">{children}</div>
                        <Footer />
                    </div>
                </MantineProvider>
            </body>
        </html>
    );
}

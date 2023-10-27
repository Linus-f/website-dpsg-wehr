import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@mantine/core/styles.css'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DPSG Wehr',
    description: 'Website der DPSG Wehr',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" suppressHydrationWarning>
            <head>
                <ColorSchemeScript />
            </head>
            <body className={inter.className}>
                <Providers>
                    <MantineProvider>
                        <div className="flex flex-col h-screen justify-between">
                            <Navbar />
                            <div className="mx-auto max-w-4xl px-6 mb-auto">
                                {children}
                            </div>
                            <Footer />
                        </div>
                    </MantineProvider>
                </Providers>
            </body>
        </html>
    );
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
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
                
            </head>
            <body className={inter.className}>
                <Providers>
                    <MantineProvider>
                        <Navbar />
                        <div className="flex flex-col h-[calc(100vh-56px)] overflow-auto justify-between">
                            <div className="md:mx-auto md:max-w-4xl px-6 my-8 relative">
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

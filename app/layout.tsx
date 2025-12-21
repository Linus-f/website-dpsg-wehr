import type { Metadata } from 'next'
import './globals.css'
import LayoutBody from '@/components/LayoutBody'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import SVGSymbols from '@/components/SVGSymbols'

export const metadata: Metadata = {
    title: 'DPSG Wehr',
    description: 'Website der DPSG Wehr',
    other: {
        'darkreader-lock': 'true',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="de" suppressHydrationWarning>
            <head>
            </head>
            <body className={`antialiased prose-headings:break-words prose-headings:hyphens-auto`}>
                <SVGSymbols />
                <Providers>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <LayoutBody>
                            {children}
                        </LayoutBody>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}

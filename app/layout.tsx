import type { Metadata } from 'next'
import './globals.css'
import LayoutBody from '@/components/LayoutBody'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import SVGSymbols from '@/components/SVGSymbols'

export const metadata: Metadata = {
    metadataBase: new URL('https://dpsg-wehr.de'),
    title: 'DPSG Wehr',
    description: 'Website der DPSG Wehr',
    other: {
        'darkreader-lock': 'true',
    },
    openGraph: {
        title: 'DPSG Wehr',
        description: 'Website der DPSG Wehr',
        url: '/',
        siteName: 'DPSG Wehr',
        images: [
            {
                url: '/images/logo.png',
                width: 800,
                height: 800,
            },
        ],
        locale: 'de_DE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DPSG Wehr',
        description: 'Website der DPSG Wehr',
        images: ['/images/logo.png'],
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

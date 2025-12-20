import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ColorSchemeScript } from '@mantine/core'
import '@mantine/core/styles.css'
import 'react-photo-album/styles.css'
import './globals.css'
import Providers from './providers'
import PageLayout from '@/components/PageLayout'

const inter = Inter({ subsets: ['latin'] })

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
                <ColorSchemeScript />
            </head>
            <body className={`${inter.className} antialiased prose-headings:break-words prose-headings:hyphens-auto`}>
                <Providers>
                    <PageLayout>
                        {children}
                    </PageLayout>
                </Providers>
            </body>
        </html>
    );
}

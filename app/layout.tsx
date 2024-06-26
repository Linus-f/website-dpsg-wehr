import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css'
import Providers from './providers'
import PageLayout from '@/components/PageLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DPSG Wehr',
    description: 'Website der DPSG Wehr',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="de" suppressHydrationWarning>
            <head>
                <title>DPSG Wehr</title>
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

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DPSG Wehr',
    description: 'Website der DPSG Wehr',
}

export default function RootLayout({
        children,
        }: {
children: React.ReactNode
}) {
    const header = (
        <header>
            <div>
                <Link href="/"><h1>Pfadfinder Wehr</h1></Link>
            </div>
        </header>
    );

    const footer = (
        <footer>
            <div>
                <br />
                <h3>© 2023 DPSG St. Bernhard Wehr</h3>
            </div>
        </footer>
    )

    return (
        <html lang="de">
            <body className={inter.className}>
                {header}
                {children}
                {footer}
            </body>
        </html>
    )
}

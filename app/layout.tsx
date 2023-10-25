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
            <div className="text-center bg-slate-800 p-8 my-6 rounded-md">
                <Link href="/">
                    <h1 className='text-3xl font-bold text-white'>Pfadfinder Wehr</h1>
                </Link>
            </div>
        </header>
    );

    const footer = (
        <footer>
            <div className="border-t border-slate-400 mt-6 py-6 text-center text-slate-400">
                <br />
                <h3>© 2023 DPSG St. Bernhard Wehr</h3>
            </div>
        </footer>
    )

    return (
        <html lang="de">
            <body className={inter.className}>
                <div className="mx-auto max-w-2xl px-6">
                    {header}
                    {children}
                    {footer}
                </div>
            </body>
        </html>
    )
}

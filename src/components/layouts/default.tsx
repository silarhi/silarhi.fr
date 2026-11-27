import type { ReactNode } from 'react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { getAllServices } from '@/utils/service'

interface DefaultLayoutProps {
    children: ReactNode
}

export default async function DefaultLayout({ children }: DefaultLayoutProps) {
    const services = (await getAllServices()).map(({ slug, title, category }) => ({ slug, title, category }))

    return (
        <div className="flex min-h-screen flex-col">
            {/* First stop of the keyboard: jumps over the navbar */}
            <a
                href="#contenu"
                className="bg-primary text-surface sr-only z-70 rounded px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 print:hidden"
            >
                Aller au contenu
            </a>
            <Navbar services={services} />
            <main id="contenu" tabIndex={-1} className="flex-1 focus:outline-none">
                {children}
            </main>
            <Footer />
        </div>
    )
}

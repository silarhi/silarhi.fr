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
            <Navbar services={services} />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}

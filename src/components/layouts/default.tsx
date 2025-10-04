'use client'

import { ReactNode } from 'react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

interface DefaultLayoutProps {
    children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}

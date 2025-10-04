'use client'

import { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

interface DefaultLayoutProps {
    children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}

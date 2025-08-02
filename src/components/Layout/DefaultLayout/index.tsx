'use client'

import { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

import styles from './index.module.scss'

interface DefaultLayoutProps {
    children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

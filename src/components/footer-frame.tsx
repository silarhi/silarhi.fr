'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { cn } from '@/utils/lib'

export interface FooterFrameProps {
    banner: ReactNode
    children: ReactNode
}

// The only pathname-dependent part of the footer: the contact page has no "Contactez-nous" banner.
// The banner and the footer content are rendered on the server and passed in as props.
export default function FooterFrame({ banner, children }: FooterFrameProps) {
    const isContactPage = usePathname() === '/contact'

    return (
        <footer
            className={cn('bg-surface-dark text-dark-foreground dark:bg-background print:hidden', {
                'mt-20': !isContactPage,
            })}
        >
            {!isContactPage && banner}
            {children}
        </footer>
    )
}

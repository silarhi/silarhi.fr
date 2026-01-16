'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface FooterWrapperProps {
    children: ReactNode
    className?: string
}

export default function FooterWrapper({ children, className }: FooterWrapperProps) {
    const pathname = usePathname()

    return (
        <footer
            className={cn(className, {
                'mt-20': pathname !== '/contact',
            })}
        >
            {children}
        </footer>
    )
}

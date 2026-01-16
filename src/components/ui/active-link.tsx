'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface ActiveLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
    children: ReactNode
    className?: string
    activeClassName?: string
    href: string
    as?: string
}

export default function ActiveLink({ children, className, activeClassName, ...props }: ActiveLinkProps) {
    const pathname = usePathname()

    // Check if this link is active by comparing pathnames
    const linkPathname = props.as || props.href
    const isActive = pathname === linkPathname || pathname === new URL(linkPathname, 'http://localhost').pathname

    return (
        <Link className={cn(className, { [activeClassName || '']: isActive })} {...props}>
            {children}
        </Link>
    )
}

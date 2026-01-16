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

    const linkHref = props.as || props.href

    // Hash-only links (e.g., #section) or links with hash (e.g., /#section)
    // should never be marked as active since we can't track hash from pathname
    const isHashLink = linkHref.startsWith('#') || linkHref.includes('#')

    // Check if this link is active by comparing pathnames (only for non-hash links)
    const isActive = !isHashLink && pathname === new URL(linkHref, 'http://localhost').pathname

    return (
        <Link className={cn(className, { [activeClassName || '']: isActive })} {...props}>
            {children}
        </Link>
    )
}

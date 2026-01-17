'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'

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
    const [isActive, setIsActive] = useState(false)

    const checkIsActive = useCallback(() => {
        // Build the full href for this link
        const linkHref = new URL(props.as || props.href, location.href).href
        // Use location.href directly to include the current hash
        const currentHref = location.href

        setIsActive(linkHref === currentHref)
    }, [props.as, props.href])

    useEffect(() => {
        // Check on mount and when pathname changes
        checkIsActive()

        // Listen for hash changes
        window.addEventListener('hashchange', checkIsActive)

        return () => {
            window.removeEventListener('hashchange', checkIsActive)
        }
    }, [pathname, checkIsActive])

    return (
        <Link className={cn(className, { [activeClassName || '']: isActive })} {...props}>
            {children}
        </Link>
    )
}

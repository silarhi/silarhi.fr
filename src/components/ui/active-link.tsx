'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useMemo } from 'react'

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

    const linkClassName = useMemo(() => {
        if (!pathname) {
            return className || ''
        }

        // Use a dummy base URL for comparison - we only care about the path
        const base = 'https://n'

        // Dynamic route will be matched via props.as Static route will be matched via props.href
        const linkPathname = new URL(props.as || props.href, base).pathname

        // Using URL().pathname to get rid of query and hash
        const activePathname = new URL(pathname, base).pathname

        return cn(className, {
            [activeClassName || '']: linkPathname === activePathname,
        })
    }, [pathname, props.as, props.href, className, activeClassName])

    return (
        <Link className={linkClassName} {...props}>
            {children}
        </Link>
    )
}

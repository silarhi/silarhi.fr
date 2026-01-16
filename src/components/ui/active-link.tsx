'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

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

    useEffect(() => {
        // Compare full hrefs to properly handle external URLs and hashes
        const linkHref = new URL(props.as || props.href, location.href).href
        const currentHref = new URL(pathname, location.href).href

        setIsActive(linkHref === currentHref)
    }, [pathname, props.as, props.href])

    return (
        <Link className={cn(className, { [activeClassName || '']: isActive })} {...props}>
            {children}
        </Link>
    )
}

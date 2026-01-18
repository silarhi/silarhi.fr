'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useMemo } from 'react'

import { useHash } from '@/providers/hash-provider'
import { cn } from '@/utils/lib'

interface ActiveLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
    children: ReactNode
    className?: string
    activeClassName?: string
    href: string
    as?: string
}

function isExternalUrl(href: string): boolean {
    if (href.startsWith('/') || href.startsWith('#')) {
        return false
    }
    try {
        const url = new URL(href, 'https://silarhi.fr')
        return url.hostname !== 'silarhi.fr' && url.hostname !== 'www.silarhi.fr'
    } catch {
        return false
    }
}

function getPathname(href: string): string {
    if (href.startsWith('#')) {
        return ''
    }
    if (href.startsWith('/')) {
        return href.split(/[?#]/)[0]
    }
    try {
        return new URL(href).pathname
    } catch {
        return href.split(/[?#]/)[0]
    }
}

function getHash(href: string): string | null {
    const hashIndex = href.indexOf('#')
    return hashIndex >= 0 ? href.slice(hashIndex) : null
}

export default function ActiveLink({ children, className, activeClassName, onClick, ...props }: ActiveLinkProps) {
    const pathname = usePathname()
    const { hash: currentHash, setHash } = useHash()

    const isActive = useMemo(() => {
        const href = props.as || props.href

        if (isExternalUrl(href)) {
            return false
        }

        if (href.startsWith('#')) {
            return href === currentHash
        }

        const linkPathname = getPathname(href)
        const linkHash = getHash(href)

        if (linkHash) {
            return linkPathname === pathname && linkHash === currentHash
        }

        return linkPathname === pathname
    }, [pathname, props.as, props.href, currentHash])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = props.as || props.href
        const hash = getHash(href)
        if (hash) {
            setHash(hash)
        }
        onClick?.(e)
    }

    const linkClassName = cn(className, { [activeClassName || '']: isActive })

    return (
        <Link className={linkClassName} onClick={handleClick} {...props}>
            {children}
        </Link>
    )
}

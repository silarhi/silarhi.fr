'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'

import { cn } from '@/utils/lib'

interface PaginationLinkProps {
    href: string
    children: React.ReactNode
    className?: string
    'aria-label'?: string
    onClick?: () => void
}

export default function PaginationLink({ href, children, className, 'aria-label': ariaLabel }: PaginationLinkProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        startTransition(() => {
            router.push(href)
        })
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={cn(className, isPending && 'pointer-events-none opacity-50')}
            aria-label={ariaLabel}
        >
            {children}
        </Link>
    )
}

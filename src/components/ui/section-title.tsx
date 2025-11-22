import { createElement, ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface SectionTitleProps {
    children: ReactNode
    level: 1 | 2 | 3
    uppercase?: boolean
    className?: string
}

export default function SectionTitle({ children, level, uppercase = false, className }: SectionTitleProps) {
    const tag = `h${level}` as 'h1' | 'h2' | 'h3'

    return createElement(
        tag,
        {
            className: cn(
                'text-foreground flex items-center gap-2 font-semibold',
                {
                    'text-sm tracking-wide uppercase': uppercase && level === 3,
                    'text-xl': level === 3 && !uppercase,
                    'text-3xl font-bold lg:text-4xl': level === 2,
                    'text-4xl font-bold lg:text-6xl': level === 1,
                },
                className
            ),
        },
        children
    )
}

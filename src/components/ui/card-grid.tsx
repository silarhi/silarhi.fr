import type { ReactNode } from 'react'

import { cn } from '@/utils/lib'

export interface CardGridProps {
    children: ReactNode
    /** Cards per row from the `lg` breakpoint (2 from `md`). */
    columns?: 2 | 3
    className?: string
}

// A wrapping row of cards rather than a CSS grid: a last row with fewer cards (or a single card) stays centered
export default function CardGrid({ children, columns = 3, className }: CardGridProps) {
    return (
        <div
            className={cn(
                'flex flex-wrap justify-center gap-6 *:w-full md:*:w-[calc((100%_-_1.5rem)/2)]',
                { 'lg:*:w-[calc((100%_-_3rem)/3)]': columns === 3 },
                className
            )}
        >
            {children}
        </div>
    )
}

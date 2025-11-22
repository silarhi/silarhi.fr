import { ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface BadgeGroupProps {
    children: ReactNode
    gap?: 'sm' | 'md' | 'lg'
    size?: 'sm' | 'md'
    className?: string
}

export default function BadgeGroup({ children, gap = 'md', size = 'md', className }: BadgeGroupProps) {
    return (
        <div
            className={cn(
                'flex flex-wrap items-center',
                {
                    'gap-1.5': gap === 'sm',
                    'gap-2': gap === 'md' && size === 'sm',
                    'gap-3': gap === 'md' && size === 'md',
                    'gap-4': gap === 'lg',
                },
                className
            )}
        >
            {children}
        </div>
    )
}

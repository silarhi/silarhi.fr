import { ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface BadgeProps {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'outline-primary'
    size?: 'sm' | 'md'
    icon?: ReactNode
    className?: string
}

const variantStyles = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary-dark',
    'outline-primary':
        'hover:border-primary hover:bg-primary/5 hover:text-primary text-gray-700 bg-surface border border-gray-300 transition-colors',
}

const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
}

export default function Badge({ children, variant = 'primary', size = 'md', icon, className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-2 rounded-full font-medium',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
        >
            {icon}
            {children}
        </span>
    )
}

import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface BadgeBaseProps {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'outline-primary'
    size?: 'sm' | 'md'
    icon?: ReactNode
    className?: string
}

interface BadgeSpanProps extends BadgeBaseProps {
    as?: 'span'
}

interface BadgeButtonProps extends BadgeBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    as: 'button'
}

type BadgeProps = BadgeSpanProps | BadgeButtonProps

const variantStyles = {
    primary: 'bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-primary-light',
    secondary: 'bg-secondary/10 text-secondary-dark dark:bg-secondary-light/20 dark:text-secondary-light',
    'outline-primary':
        'hover:border-primary hover:bg-primary/5 hover:text-primary text-gray-700 bg-surface border border-gray-300 transition-colors dark:bg-light dark:border-border dark:text-foreground dark:hover:border-primary-light dark:hover:bg-primary-light/10',
}

const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
}

export default function Badge({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    className,
    as,
    ...props
}: BadgeProps) {
    const classes = cn(
        'inline-flex items-center gap-2 rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
    )

    if (as === 'button') {
        return (
            <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
                {icon}
                {children}
            </button>
        )
    }

    return (
        <span className={classes}>
            {icon}
            {children}
        </span>
    )
}

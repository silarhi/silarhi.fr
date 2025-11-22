import Link from 'next/link'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'muted' | 'danger' | 'outline-dark' | 'outline-primary'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    as?: 'a'
    href?: string
    children: ReactNode
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', as, href, className, children, disabled, ...props }, ref) => {
        const baseClasses =
            'cursor-pointer hover:no-underline inline-flex items-center justify-center gap-2 font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

        const variantClasses = {
            primary: 'bg-primary text-surface hover:bg-primary-light focus:ring-primary',
            'outline-primary':
                'bg-surface border border-gray-300 text-gray-700 hover:border-primary hover:bg-primary/5 hover:text-primary focus:ring-primary',
            secondary: 'bg-secondary text-surface hover:bg-secondary/80 focus:ring-secondary',
            muted: 'bg-muted text-surface hover:bg-gray-700 focus:ring-muted',
            danger: 'bg-red-600 text-surface hover:bg-red-700 focus:ring-red-600',
            'outline-dark': 'bg-surface border border-dark text-dark hover:bg-dark hover:text-surface focus:ring-dark',
        }

        const sizeClasses = {
            xs: 'px-2 py-1 text-xs leading-none',
            sm: 'px-4 py-2 text-sm leading-none',
            md: 'px-5 py-2.5 text-base',
            lg: 'px-6 py-3 text-lg',
        }

        const classes = cn(
            baseClasses,
            {
                'opacity-50 cursor-not-allowed pointer-events-none': disabled,
            },
            variantClasses[variant],
            sizeClasses[size],
            className
        )

        if (as === 'a' && href) {
            return (
                <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes}>
                    {children}
                </Link>
            )
        }

        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={classes}
                {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button

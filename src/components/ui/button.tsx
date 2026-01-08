import Link, { LinkProps } from 'next/link'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface ButtonBaseProps {
    variant?: 'primary' | 'secondary' | 'muted' | 'danger' | 'outline-dark' | 'outline-primary' | 'link'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    children: ReactNode
    disabled?: boolean
    className?: string
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    as?: never
    href?: never
    scroll?: never
}

interface ButtonAsLink extends ButtonBaseProps, Omit<LinkProps, 'children'> {
    as: 'a'
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', as, href, scroll, className, children, disabled, ...props }, ref) => {
        const baseClasses =
            'cursor-pointer hover:no-underline inline-flex items-center justify-center gap-2 font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

        const variantClasses = {
            primary:
                'bg-primary text-surface hover:bg-primary-light focus:ring-primary dark:bg-primary-light dark:hover:bg-primary',
            'outline-primary':
                'bg-surface border border-gray-300 text-gray-700 hover:border-primary hover:bg-primary/5 hover:text-primary focus:ring-primary dark:bg-light dark:border-border dark:text-foreground dark:hover:border-primary-light dark:hover:bg-primary-light/10',
            secondary:
                'bg-secondary text-surface hover:bg-secondary/80 focus:ring-secondary dark:text-dark dark:bg-secondary-light dark:hover:bg-secondary',
            muted: 'bg-muted text-surface hover:bg-gray-700 focus:ring-muted dark:bg-muted/20 dark:hover:bg-muted/30',
            danger: 'bg-red-600 text-surface hover:bg-red-700 focus:ring-red-600 dark:bg-error dark:hover:bg-red-600',
            'outline-dark':
                'bg-surface border border-dark text-dark hover:bg-dark hover:text-surface focus:ring-dark dark:bg-surface dark:text-foreground dark:hover:bg-surface-elevated dark:hover:text-foreground',
            link: 'bg-transparent text-foreground/80 hover:text-foreground underline focus:ring-primary p-0',
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
                <Link
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    href={href}
                    scroll={scroll}
                    className={classes}
                    {...(props as Omit<LinkProps, 'href'>)}
                >
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

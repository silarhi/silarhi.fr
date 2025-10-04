import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

import { cn } from '@/utils/lib'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'sub-primary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    as?: 'a'
    href?: string
    children: ReactNode
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', as, href, className, children, ...props }, ref) => {
        const baseClasses =
            'inline-block font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

        const variantClasses = {
            primary: 'bg-primary text-white hover:bg-primary-light focus:ring-primary',
            secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600',
            'sub-primary': 'bg-sub-primary text-white hover:bg-yellow-500 focus:ring-sub-primary',
            danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
        }

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-5 py-2.5 text-base',
            lg: 'px-6 py-3 text-lg',
        }

        const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

        if (as === 'a' && href) {
            return (
                <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes}>
                    {children}
                </a>
            )
        }

        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={classes}
                {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button

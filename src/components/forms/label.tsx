import { LabelHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    label?: string
    children?: ReactNode
}

export default function Label({ label, htmlFor, children, className, ...props }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className={cn('mb-2 block text-sm font-medium', className)} {...props}>
            {label}
            {children}
        </label>
    )
}

import { LabelHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode
}

export default function Label({ htmlFor, children, className, ...props }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className={cn('mb-2 block text-sm font-semibold tracking-wide', className)} {...props}>
            {children}
        </label>
    )
}

import { LabelHTMLAttributes, ReactNode } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    label?: string
    children?: ReactNode
}

export default function Label({ label, htmlFor, children, className, ...props }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className={`block text-sm font-medium mb-2 ${className || ''}`} {...props}>
            {label}
            {children}
        </label>
    )
}

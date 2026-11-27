import type { ReactNode } from 'react'

interface HelpProps {
    type?: 'help' | 'invalid' | 'valid'
    /** Lets the field point to the message with aria-describedby */
    id?: string
    children: ReactNode
}

export default function Help({ type, id, children }: HelpProps) {
    if (type === 'help') {
        return (
            <div id={id} className="text-foreground/80 mt-1.5 text-sm">
                {children}
            </div>
        )
    }

    if (type === 'invalid') {
        return (
            <div
                id={id}
                className="text-error animate-in fade-in slide-in-from-top-1 mt-1.5 block text-sm font-medium duration-200"
            >
                {children}
            </div>
        )
    }

    return (
        <div
            id={id}
            className="text-success animate-in fade-in slide-in-from-top-1 mt-1.5 block text-sm font-medium duration-200"
        >
            {children}
        </div>
    )
}

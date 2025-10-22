import { ReactNode } from 'react'

interface HelpProps {
    type?: 'help' | 'invalid' | 'valid'
    children: ReactNode
}

export default function Help({ type, children }: HelpProps) {
    if (type === 'help') {
        return <div className="text-muted mt-1.5 text-sm">{children}</div>
    }

    if (type === 'invalid') {
        return <div className="text-error mt-1.5 block text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-200">{children}</div>
    }

    return <div className="text-success mt-1.5 block text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-200">{children}</div>
}

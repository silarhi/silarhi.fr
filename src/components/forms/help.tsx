import { ReactNode } from 'react'

interface HelpProps {
    type?: 'help' | 'invalid' | 'valid'
    children: ReactNode
}

export default function Help({ type, children }: HelpProps) {
    if (type === 'help') {
        return <div className="text-muted mt-1 text-sm">{children}</div>
    }

    if (type === 'invalid') {
        return <div className="text-error mt-1 block text-sm">{children}</div>
    }

    return <div className="text-success mt-1 block text-sm">{children}</div>
}

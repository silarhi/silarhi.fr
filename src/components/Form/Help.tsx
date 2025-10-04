import { ReactNode } from 'react'

interface HelpProps {
    type?: 'help' | 'invalid' | 'valid'
    children: ReactNode
}

export default function Help({ type, children }: HelpProps) {
    if (type === 'help') {
        return <div className="text-sm text-gray-500 mt-1">{children}</div>
    }

    if (type === 'invalid') {
        return <div className="text-sm text-red-600 mt-1 block">{children}</div>
    }

    return <div className="text-sm text-green-600 mt-1 block">{children}</div>
}

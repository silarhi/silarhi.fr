import { ReactNode } from 'react'

interface TitleProps {
    children: ReactNode
}

export default function Title({ children }: TitleProps) {
    return (
        <div className="mb-4">
            <h1 className="text-center text-5xl">{children}</h1>
        </div>
    )
}

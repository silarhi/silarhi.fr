import { ReactNode } from 'react'

interface IconWrapperProps {
    children: ReactNode
}

export default function IconWrapper({ children }: IconWrapperProps) {
    return (
        <div className="relative bg-white border-8 border-gray-100 rounded-full text-sub-primary w-32 h-32 sm:w-40 sm:h-40 mx-auto flex items-center justify-center transition-all duration-300 ease-in-out before:content-[''] before:block before:absolute before:left-0 before:top-0 before:rounded-full before:w-full before:h-full before:border before:border-gray-200 before:transition-colors before:duration-300 hover:bg-sub-primary hover:text-white hover:before:border-sub-primary">
            <div className="[&>svg]:w-[3.5em] [&>svg]:h-[3.5em] sm:[&>svg]:w-[4.5em] sm:[&>svg]:h-[4.5em]">
                {children}
            </div>
        </div>
    )
}

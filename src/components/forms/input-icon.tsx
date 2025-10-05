import { ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface InputIconProps {
    iconPrepend?: ReactNode
    iconAppend?: ReactNode
    children: ReactNode
}

export default function InputIcon({ iconPrepend, iconAppend, children }: InputIconProps) {
    return (
        <div className="relative">
            {iconPrepend && (
                <div className="text-muted pointer-events-none absolute top-0 bottom-0 left-0 z-[2] flex min-w-10 items-center justify-center text-lg opacity-80">
                    {iconPrepend}
                </div>
            )}
            <div className={cn({ '[&>input]:pl-10 [&>textarea]:pl-10': iconPrepend })}>{children}</div>
            {iconAppend && (
                <div className="text-muted pointer-events-none absolute top-0 right-0 bottom-0 z-[2] flex min-w-10 items-center justify-center text-lg opacity-80 [&>a]:pointer-events-auto [&>button]:pointer-events-auto">
                    {iconAppend}
                </div>
            )}
        </div>
    )
}

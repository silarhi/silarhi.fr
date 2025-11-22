import { ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface InputIconProps {
    iconPrepend?: ReactNode
    iconAppend?: ReactNode
    children: ReactNode
}

export default function InputIcon({ iconPrepend, iconAppend, children }: InputIconProps) {
    return (
        <div className="group relative">
            {iconPrepend && (
                <div
                    className={cn(
                        'text-foreground/80 pointer-events-none absolute left-0 z-[2] flex min-w-10 justify-center text-lg opacity-80',
                        'top-0 bottom-0 items-center',
                        'group-has-[textarea]:bottom-auto group-has-[textarea]:items-start group-has-[textarea]:pt-4'
                    )}
                >
                    {iconPrepend}
                </div>
            )}
            <div className={cn({ '[&>input]:pl-10 [&>textarea]:pl-10': iconPrepend })}>{children}</div>
            {iconAppend && (
                <div
                    className={cn(
                        'text-foreground/80 pointer-events-none absolute right-0 z-[2] flex min-w-10 justify-center text-lg opacity-80 [&>a]:pointer-events-auto [&>button]:pointer-events-auto',
                        'top-0 bottom-0 items-center',
                        'group-has-[textarea]:bottom-auto group-has-[textarea]:items-start group-has-[textarea]:pt-4'
                    )}
                >
                    {iconAppend}
                </div>
            )}
        </div>
    )
}

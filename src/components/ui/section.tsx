import React from 'react'

import { cn } from '@/utils/lib'

export default function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <section className={cn('py-16 lg:py-20', className)} {...props}>
            <div className="container mx-auto px-4 lg:px-8">{children}</div>
        </section>
    )
}

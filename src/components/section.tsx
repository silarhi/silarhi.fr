'use client'

import { cn } from '@/utils/lib'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean
    fluid?: boolean
    size?: 'default' | 'xl'
    paddingX?: boolean
    paddingY?: boolean
}

export default function Section({
    container = true,
    fluid = false,
    size = 'default',
    children,
    className,
    paddingX = true,
    paddingY = true,
    ...props
}: SectionProps) {
    const containerClass = fluid ? 'w-full px-4' : 'container mx-auto px-4'

    const sectionClasses = cn(
        paddingX && 'px-4 lg:px-8 xl:px-16',
        paddingY && 'py-4 lg:py-8 xl:py-16',
        size === 'xl' && 'h-screen sm:h-[75vh] md:h-[56.25vh] lg:h-[42.86vh]',
        className
    )

    return (
        <section className={sectionClasses} {...props}>
            <>
                {container && <div className={cn(containerClass, { 'px-0': paddingX })}>{children}</div>}
                {!container && children}
            </>
        </section>
    )
}

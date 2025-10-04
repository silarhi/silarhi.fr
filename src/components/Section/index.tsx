'use client'

import { cn } from '@/utils/lib'

import styles from './index.module.scss'

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

    return (
        <section
            className={cn(className, {
                [styles.sectionWithPaddingX]: paddingX,
                [styles.sectionWithPaddingY]: paddingY,
                [styles.sectionXl]: size === 'xl',
            })}
            {...props}
        >
            <>
                {container && <div className={cn(containerClass, { 'px-0': paddingX })}>{children}</div>}
                {!container && children}
            </>
        </section>
    )
}

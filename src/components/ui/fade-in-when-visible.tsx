import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/utils/lib'

interface FadeInWhenVisibleProps {
    children: ReactNode
    delay?: number
    yOffset?: number
    className?: string
}

/**
 * Fades its content in as it scrolls into view, with a CSS scroll-driven animation (`.fade-in-on-scroll` in
 * globals.css): no JavaScript, nothing to hydrate, and the content is never hidden where the animation is not
 * supported. `delay` (seconds) staggers siblings by starting their fade further into the scroll.
 * Keep it for content below the fold: above it, there is nothing to reveal.
 */
export default function FadeInWhenVisible({ children, delay = 0, yOffset = 20, className }: FadeInWhenVisibleProps) {
    const style = { '--fade-delay': delay, '--fade-y': `${yOffset}px` } as CSSProperties

    return (
        <div className={cn('fade-in-on-scroll', className)} style={style}>
            {children}
        </div>
    )
}

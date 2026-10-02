'use client'

import { useInView } from 'motion/react'
import * as m from 'motion/react-m'
import type React from 'react'
import { useRef } from 'react'

interface FadeInWhenVisibleProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    yOffset?: number
    className?: string
}

/**
 * Fades its content in when scrolled into view. The content is server-rendered at opacity 0 and only revealed
 * once React has hydrated, so never wrap above-the-fold content with it: it would delay the LCP and leave the
 * first screen blank on slow devices.
 */
export default function FadeInWhenVisible({
    children,
    delay = 0,
    duration = 0.5,
    yOffset = 20,
    className,
}: FadeInWhenVisibleProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    return (
        <m.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </m.div>
    )
}

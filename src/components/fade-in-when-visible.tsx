'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeInWhenVisibleProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    yOffset?: number
    className?: string
}

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
        <motion.div
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
        </motion.div>
    )
}

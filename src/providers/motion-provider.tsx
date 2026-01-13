'use client'

import { LazyMotion } from 'framer-motion'
import { ReactNode } from 'react'

const loadFeatures = () => import('@/lib/motion-features').then((res) => res.default)

interface MotionProviderProps {
    children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
    return (
        <LazyMotion features={loadFeatures} strict>
            {children}
        </LazyMotion>
    )
}

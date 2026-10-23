'use client'
import { useEffect } from 'react'

import { trackClick } from '@/utils/analytics'

/**
 * Registers the delegated click listener that sends the Umami goal events (see `@/utils/analytics`). Renders nothing.
 */
export default function Analytics() {
    useEffect(() => {
        document.addEventListener('click', trackClick)
        return () => document.removeEventListener('click', trackClick)
    }, [])

    return null
}

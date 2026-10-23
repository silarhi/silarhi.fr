'use client'
import { useEffect } from 'react'

import { trackLinkClick } from '@/utils/analytics'

/**
 * Registers the delegated click listener that sends the Umami goal events (see `@/utils/analytics`). Renders nothing.
 */
export default function Analytics() {
    useEffect(() => {
        document.addEventListener('click', trackLinkClick)
        return () => document.removeEventListener('click', trackLinkClick)
    }, [])

    return null
}

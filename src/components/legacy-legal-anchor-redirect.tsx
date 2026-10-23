'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Sections that moved out of the mentions légales to their own page
const movedAnchors: Record<string, string> = {
    '#donnees-personnelles': '/politique-de-confidentialite',
    '#cookies': '/cookies',
}

/**
 * Forwards the old /mentions-legales anchors to their new page. A server redirect cannot do it: the fragment is
 * never sent to the server.
 */
export default function LegacyLegalAnchorRedirect() {
    const router = useRouter()

    useEffect(() => {
        const forward = () => {
            const destination = movedAnchors[window.location.hash]
            if (destination) {
                router.replace(destination)
            }
        }
        forward()

        window.addEventListener('hashchange', forward)

        return () => window.removeEventListener('hashchange', forward)
    }, [router])

    return null
}

import { notFound } from 'next/navigation'

import { renderOgImage } from '@/lib/og-image'
import { getAllServiceSlugs, getServiceBySlug } from '@/utils/service'

export const alt = "SILARHI, agence de développement d'applications Web PHP et Symfony à Toulouse et en France"
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

// Drawn at build time for the same slugs as the page
export const dynamicParams = false

export function generateStaticParams() {
    return getAllServiceSlugs().map((slug) => ({ slug }))
}

// The service's title, with its category as the badge
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const service = await getServiceBySlug(slug)

    if (!service) {
        notFound()
    }

    return renderOgImage({ badge: service.category ?? 'Service', title: service.title })
}

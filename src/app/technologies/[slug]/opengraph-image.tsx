import { notFound } from 'next/navigation'

import { renderOgImage } from '@/lib/og-image'
import { getProjectFilterData } from '@/utils/project'
import { getTechnologyBySlug } from '@/utils/technology'

export const alt = "SILARHI, agence de développement d'applications Web PHP et Symfony à Toulouse et en France"
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

// Drawn at build time for the same slugs as the page: the technologies with a published project
export const dynamicParams = false

export async function generateStaticParams() {
    const { technologies } = await getProjectFilterData()
    return technologies.map(({ slug }) => ({ slug }))
}

// The technology page's title, with the technology's name as the badge
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const technology = await getTechnologyBySlug(slug)

    if (!technology) {
        notFound()
    }

    return renderOgImage({ badge: technology.name, title: technology.title })
}

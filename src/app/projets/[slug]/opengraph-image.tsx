import { notFound } from 'next/navigation'

import { renderOgImage } from '@/lib/og-image'
import { getAllProjectSlugs, getProjectBySlug } from '@/utils/project'

export const alt = "Étude de cas SILARHI, agence de développement d'applications Web PHP et Symfony"
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

// Drawn at build time for the same slugs as the page
export const dynamicParams = false

export async function generateStaticParams() {
    return (await getAllProjectSlugs()).map((slug) => ({ slug }))
}

// The project's title, with its client as the badge
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return renderOgImage({ badge: `Étude de cas · ${project.client.name}`, title: project.title })
}

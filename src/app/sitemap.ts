import { MetadataRoute } from 'next'

import { getAllProjects, getAllProjectTags } from '@/utils/project'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000'

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/conditions-generales-de-vente`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ]

    // Projects pages
    const projectPages = [
        {
            url: `${baseUrl}/projets`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
    ]

    try {
        // Get all projects
        const projects = await getAllProjects()
        const projectPosts = projects.map((project) => ({
            url: `${baseUrl}/projets/${project.slug}`,
            lastModified: new Date(project.date),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))

        // Get all project tags
        const projectTags = await getAllProjectTags()
        const projectTagPages = projectTags.map((tag) => ({
            url: `${baseUrl}/projets/tag/${tag.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.4,
        }))

        return [...staticPages, ...projectPages, ...projectPosts, ...projectTagPages]
    } catch (error) {
        console.error('Error generating sitemap:', error)

        // Return at least the static pages if there's an error
        return [...staticPages, ...projectPages]
    }
}

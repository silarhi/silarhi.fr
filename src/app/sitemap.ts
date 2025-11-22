import { MetadataRoute } from 'next'

import { getAllProjects } from '@/utils/project'
import { getAllTechnologies } from '@/utils/technology'

const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`
    }

    return 'http://localhost:3000'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseUrl()

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
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
            lastModified: project.date,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))

        // Get all technologies
        const technologies = await getAllTechnologies()
        const technologyPages = technologies.map((technology) => ({
            url: `${baseUrl}/technologies/${technology.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))

        return [...staticPages, ...projectPages, ...projectPosts, ...technologyPages]
    } catch (error) {
        console.error('Error generating sitemap:', error)

        // Return at least the static pages if there's an error
        return [...staticPages, ...projectPages]
    }
}

import type { MetadataRoute } from 'next'

import { getAllProjects } from '@/utils/project'
import { getAllServices } from '@/utils/service'
import { getAllTechnologies } from '@/utils/technology'
import { getBaseUrl } from '@/utils/url'

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
            url: `${baseUrl}/technologies`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/open-source`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
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
        {
            url: `${baseUrl}/politique-de-confidentialite`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cookies`,
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

        // Get all services
        const services = await getAllServices()
        const servicePages = services.map((service) => ({
            url: `${baseUrl}/${service.slug}`,
            lastModified: service.date ? new Date(service.date) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        }))

        return [...staticPages, ...servicePages, ...projectPages, ...projectPosts, ...technologyPages]
    } catch (error) {
        console.error('Error generating sitemap:', error)

        // Return at least the static pages if there's an error
        return [...staticPages, ...projectPages]
    }
}

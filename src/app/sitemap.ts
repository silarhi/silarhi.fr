import type { MetadataRoute } from 'next'

import { LEGAL_PAGE_UPDATES } from '@/utils/legal-pages'
import { getAllProjects, type Project } from '@/utils/project'
import { getAllServices, type Service } from '@/utils/service'
import { getAllTechnologies } from '@/utils/technology'
import { getBaseUrl } from '@/utils/url'

// `lastmod` must be the date the page's content last changed: Google ignores it site-wide once it sees build times.
// A page whose content has no date (contact, open source) gets no `lastmod` rather than a made-up one.

// Most recent of the given dates, or undefined when there is none
function latest(dates: (Date | undefined)[]): Date | undefined {
    const times = dates.filter((date): date is Date => date instanceof Date && !Number.isNaN(date.getTime()))
    return times.length > 0 ? new Date(Math.max(...times.map((date) => date.getTime()))) : undefined
}

// A project page changes with its start, its end and each iteration added to its timeline
function getProjectLastModified(project: Project): Date | undefined {
    return latest([project.date, project.endDate, ...project.iterations.map((iteration) => iteration.date)])
}

function getServiceLastModified(service: Service): Date | undefined {
    return service.date ? new Date(service.date) : undefined
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseUrl()
    const [projects, services, technologies] = await Promise.all([
        getAllProjects(),
        getAllServices(),
        getAllTechnologies(),
    ])

    const projectDates = new Map(projects.map((project) => [project.slug, getProjectLastModified(project)]))
    const serviceDates = services.map(getServiceLastModified)
    const projectsLastModified = latest([...projectDates.values()])

    // A technology page lists the projects and the services that use it
    const technologyPages = technologies.map((technology) => ({
        url: `${baseUrl}/technologies/${technology.slug}`,
        lastModified: latest([
            ...projects
                .filter((project) => project.technologies.some((tech) => tech.slug === technology.slug))
                .map((project) => projectDates.get(project.slug)),
            ...services.filter((service) => service.technologies.includes(technology.slug)).map(getServiceLastModified),
        ]),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    const legalPages = Object.entries(LEGAL_PAGE_UPDATES).map(([path, updated]) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(updated),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    }))

    return [
        {
            // The home page shows the latest projects and links every service
            url: baseUrl,
            lastModified: latest([projectsLastModified, ...serviceDates]),
            changeFrequency: 'monthly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/contact`,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        ...services.map((service) => ({
            url: `${baseUrl}/${service.slug}`,
            lastModified: getServiceLastModified(service),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        })),
        {
            url: `${baseUrl}/projets`,
            lastModified: projectsLastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        ...projects.map((project) => ({
            url: `${baseUrl}/projets/${project.slug}`,
            lastModified: projectDates.get(project.slug),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
        {
            url: `${baseUrl}/technologies`,
            lastModified: latest(technologyPages.map((page) => page.lastModified)),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        ...technologyPages,
        {
            url: `${baseUrl}/open-source`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        ...legalPages,
    ]
}

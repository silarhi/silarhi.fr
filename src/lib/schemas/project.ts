/**
 * JSON-LD Schema generators for project pages
 */

import type { Project } from '@/utils/project'
import { getCanonicalUrl } from '@/utils/url'

import {
    BreadcrumbList,
    COMPANY_INFO,
    CreativeWork,
    generateBreadcrumbSchema,
    ItemList,
    Organization,
    WebPage,
} from './index'

/**
 * Generate CreativeWork schema for a project
 */
export function generateProjectSchema(project: Project): CreativeWork {
    const url = getCanonicalUrl(`/projets/${project.slug}`)

    return {
        '@type': 'SoftwareApplication',
        name: project.name ? `${project.name} - ${project.title}` : project.title,
        description: project.excerpt,
        url,
        image: project.image ? `${COMPANY_INFO.url}${project.image}` : undefined,
        dateCreated: project.date.toISOString().split('T')[0],
        datePublished: project.date.toISOString().split('T')[0],
        author: { '@id': `${COMPANY_INFO.url}/#organization` } as Organization,
        creator: { '@id': `${COMPANY_INFO.url}/#organization` } as Organization,
        provider: { '@id': `${COMPANY_INFO.url}/#organization` } as Organization,
        keywords: project.technologies.map((tech) => tech.name),
        applicationCategory: project.category,
    }
}

/**
 * Generate WebPage schema for a project detail page
 */
export function generateProjectPageSchema(project: Project): WebPage {
    const url = getCanonicalUrl(`/projets/${project.slug}`)
    const projectName = project.name ? `${project.name} - ${project.title}` : project.title

    return {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        name: `${projectName} - SILARHI`,
        description: project.excerpt,
        url,
        isPartOf: {
            '@id': `${COMPANY_INFO.url}/#website`,
        },
        breadcrumb: generateProjectBreadcrumbSchema(project),
    }
}

/**
 * Generate BreadcrumbList schema for a project page
 */
function generateProjectBreadcrumbSchema(project: Project): BreadcrumbList {
    const projectName = project.name ? `${project.name} - ${project.title}` : project.title

    return generateBreadcrumbSchema([
        { name: 'Accueil', url: COMPANY_INFO.url },
        { name: 'Projets', url: getCanonicalUrl('/projets') },
        { name: projectName, url: getCanonicalUrl(`/projets/${project.slug}`) },
    ])
}

/**
 * Generate ItemList schema for a list of projects
 */
export function generateProjectsListSchema(
    projects: Project[],
    options?: {
        name?: string
        description?: string
    }
): ItemList {
    return {
        '@type': 'ItemList',
        name: options?.name || 'Projets SILARHI',
        description: options?.description || 'Liste des projets réalisés par SILARHI',
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem' as const,
            position: index + 1,
            name: project.name ? `${project.name} - ${project.title}` : project.title,
            url: getCanonicalUrl(`/projets/${project.slug}`),
            item: generateProjectSchema(project),
        })),
    }
}

/**
 * Generate CollectionPage schema for the projects listing page
 */
export function generateProjectsCollectionPageSchema(
    projects: Project[],
    options?: {
        title?: string
        description?: string
    }
): WebPage {
    const url = getCanonicalUrl('/projets')

    return {
        '@type': 'CollectionPage',
        '@id': `${url}/#webpage`,
        name: options?.title || 'Nos Projets - SILARHI',
        description:
            options?.description || "Découvrez nos réalisations en développement d'applications Web sur mesure.",
        url,
        isPartOf: {
            '@id': `${COMPANY_INFO.url}/#website`,
        },
        breadcrumb: generateBreadcrumbSchema([
            { name: 'Accueil', url: COMPANY_INFO.url },
            { name: 'Projets', url },
        ]),
    }
}

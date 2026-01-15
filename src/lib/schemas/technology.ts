/**
 * JSON-LD Schema generators for technology pages
 */

import type { Project } from '@/utils/project'
import type { Technology } from '@/utils/technology'
import { getCanonicalUrl } from '@/utils/url'

import { BreadcrumbList, COMPANY_INFO, generateBreadcrumbSchema, ItemList, Thing, WebPage } from './index'
import { generateProjectSchema } from './project'

/**
 * Generate a technology schema as a Thing (generic)
 * Schema.org doesn't have a specific type for programming technologies,
 * so we use Thing with appropriate properties
 */
function generateTechnologySchema(technology: Technology): Thing {
    return {
        '@type': 'Thing',
        name: technology.name,
        description: technology.description,
        url: technology.url,
    }
}

/**
 * Generate WebPage schema for a technology detail page
 */
export function generateTechnologyPageSchema(technology: Technology, _projects: Project[]): WebPage {
    const url = getCanonicalUrl(`/technologies/${technology.slug}`)

    return {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        name: technology.meta_title || `${technology.name} - SILARHI`,
        description: technology.meta_description || technology.description,
        url,
        isPartOf: {
            '@id': `${COMPANY_INFO.url}/#website`,
        },
        breadcrumb: generateTechnologyBreadcrumbSchema(technology),
        mainEntity: generateTechnologySchema(technology),
    }
}

/**
 * Generate BreadcrumbList schema for a technology page
 */
function generateTechnologyBreadcrumbSchema(technology: Technology): BreadcrumbList {
    return generateBreadcrumbSchema([
        { name: 'Accueil', url: COMPANY_INFO.url },
        { name: 'Technologies', url: getCanonicalUrl('/technologies') },
        { name: technology.name, url: getCanonicalUrl(`/technologies/${technology.slug}`) },
    ])
}

/**
 * Generate ItemList schema for projects using a technology
 */
export function generateTechnologyProjectsListSchema(technology: Technology, projects: Project[]): ItemList {
    return {
        '@type': 'ItemList',
        name: `Projets ${technology.name}`,
        description: `Projets réalisés avec ${technology.name} par SILARHI`,
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

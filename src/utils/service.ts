import path from 'path'
import * as v from 'valibot'

import {
    contentDirectory,
    lazy,
    optionalText,
    parseFrontMatter,
    readMdxDirectory,
    requiredText,
    textList,
} from './content'

const serviceFrontMatterSchema = v.object({
    title: requiredText,
    order: v.optional(v.number(), 0),
    meta_title: requiredText,
    meta_description: requiredText,
    excerpt: requiredText,
    intro: requiredText,
    date: v.optional(v.pipe(v.string(), v.isoDate())),
    service_type: optionalText,
    projects: textList,
    // Heading of the case studies section, written for 3 projects ("Nos 3 dernières reprises d'application")
    projects_title: optionalText,
    // Line above that heading; a generic one when absent
    projects_subtitle: optionalText,
    // Badge above the H1 ("Finance & Banque"), also printed on the Open Graph image; "Service" when absent
    category: optionalText,
    // Open-source packages (`OPEN_SOURCE_PACKAGES` slugs) shown as the tools behind the service
    packages: textList,
    // Technology slugs whose pages link back to this service
    technologies: textList,
    faq: v.optional(v.array(v.object({ question: requiredText, answer: requiredText })), []),
    cta: v.object({ title: requiredText, description: requiredText }),
})

type ServiceFrontMatter = v.InferOutput<typeof serviceFrontMatterSchema>

export interface Service extends Omit<ServiceFrontMatter, 'date' | 'service_type'> {
    slug: string
    /** YYYY-MM-DD, empty when absent */
    date: string
    /** schema.org service type, the title when absent */
    service_type: string
    content: string
}

// Published services only: drafts may have incomplete front matter, so they are not validated
const loadServices = lazy(() => {
    const services = new Map<string, Service>()

    for (const file of readMdxDirectory(path.join(contentDirectory, 'services'))) {
        if (!file.data.published) {
            continue
        }

        const frontMatter = parseFrontMatter(serviceFrontMatterSchema, file)
        services.set(file.slug, {
            ...frontMatter,
            slug: file.slug,
            date: frontMatter.date ?? '',
            service_type: frontMatter.service_type ?? frontMatter.title,
            content: file.content,
        })
    }

    return services
})

// Get all service slugs
export function getAllServiceSlugs(): string[] {
    return Array.from(loadServices().keys())
}

// Get a single service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
    return loadServices().get(slug) ?? null
}

// Get all services, in editorial order
export async function getAllServices(): Promise<Service[]> {
    return Array.from(loadServices().values()).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

// Get the services that list a technology, in editorial order
export async function getServicesByTechnology(technologySlug: string): Promise<Service[]> {
    const services = await getAllServices()
    return services.filter((service) => service.technologies.includes(technologySlug))
}

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const servicesDirectory = path.join(process.cwd(), 'content/services')

interface ServiceFaqItem {
    question: string
    answer: string
}

interface ServiceCta {
    title: string
    description: string
}

export interface Service {
    slug: string
    order: number
    title: string
    meta_title: string
    meta_description: string
    excerpt: string
    intro: string
    date: string
    published: boolean
    service_type: string
    projects: string[]
    /** Open-source packages (`OPEN_SOURCE_PACKAGES` slugs) shown as the tools behind the service. */
    packages: string[]
    /** Technology slugs whose pages link back to this service. */
    technologies: string[]
    faq: ServiceFaqItem[]
    cta: ServiceCta
    content: string
}

type ServiceFrontMatter = Partial<Omit<Service, 'slug' | 'content'>>

type RequiredTextField = 'title' | 'meta_title' | 'meta_description' | 'excerpt' | 'intro'

// Read a mandatory text field, failing the build with a clear message when a draft is incomplete
function requireText(frontMatter: ServiceFrontMatter, slug: string, field: RequiredTextField): string {
    const value = frontMatter[field]
    if (!value) {
        throw new Error(`Service "${slug}" is missing the required "${field}" front matter field`)
    }
    return value
}

// In-memory cache for services (loaded once per build)
let servicesCache: Map<string, Service> | null = null

// Load all published services into cache
function loadServicesCache(): Map<string, Service> {
    if (servicesCache) {
        return servicesCache
    }

    servicesCache = new Map()

    if (!fs.existsSync(servicesDirectory)) {
        return servicesCache
    }

    const fileNames = fs.readdirSync(servicesDirectory)
    const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'))

    for (const fileName of mdxFiles) {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(servicesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const frontMatter = data as ServiceFrontMatter

        // Skip unpublished services (drafts)
        if (!frontMatter.published) {
            continue
        }

        const title = requireText(frontMatter, slug, 'title')
        if (!frontMatter.cta) {
            throw new Error(`Service "${slug}" is missing the required "cta" front matter field`)
        }

        servicesCache.set(slug, {
            slug,
            order: frontMatter.order ?? 0,
            title,
            meta_title: requireText(frontMatter, slug, 'meta_title'),
            meta_description: requireText(frontMatter, slug, 'meta_description'),
            excerpt: requireText(frontMatter, slug, 'excerpt'),
            intro: requireText(frontMatter, slug, 'intro'),
            date: String(frontMatter.date ?? ''),
            published: true,
            service_type: frontMatter.service_type ?? title,
            projects: frontMatter.projects ?? [],
            packages: frontMatter.packages ?? [],
            technologies: frontMatter.technologies ?? [],
            faq: frontMatter.faq ?? [],
            cta: frontMatter.cta,
            content,
        })
    }

    return servicesCache
}

// Get all service slugs
export function getAllServiceSlugs(): string[] {
    const cache = loadServicesCache()
    return Array.from(cache.keys())
}

// Get a single service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
    const cache = loadServicesCache()
    return cache.get(slug) ?? null
}

// Get all services, in editorial order
export async function getAllServices(): Promise<Service[]> {
    const cache = loadServicesCache()
    return Array.from(cache.values()).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

// Get the services that list a technology, in editorial order
export async function getServicesByTechnology(technologySlug: string): Promise<Service[]> {
    const services = await getAllServices()
    return services.filter((service) => service.technologies.includes(technologySlug))
}

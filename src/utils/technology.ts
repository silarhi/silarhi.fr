import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const technologiesDirectory = path.join(process.cwd(), 'content/technologies')

interface TechnologyReason {
    title: string
    description: string
}

export interface Technology {
    slug: string
    name: string
    name_aliases?: string[]
    title: string
    description: string
    meta_title: string
    meta_description: string
    long_description: string
    url: string
    reasons: TechnologyReason[]
    content: string
}

interface TechnologyFrontMatter {
    name: string
    name_aliases?: string[]
    title: string
    description: string
    meta_title: string
    meta_description: string
    long_description: string
    url: string
    reasons: TechnologyReason[]
}

// In-memory cache for technologies (loaded once per build)
let technologiesCache: Map<string, Technology> | null = null

// Load all technologies into cache
function loadTechnologiesCache(): Map<string, Technology> {
    if (technologiesCache) {
        return technologiesCache
    }

    technologiesCache = new Map()

    if (!fs.existsSync(technologiesDirectory)) {
        return technologiesCache
    }

    const fileNames = fs.readdirSync(technologiesDirectory)
    const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'))

    for (const fileName of mdxFiles) {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(technologiesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const frontMatter = data as TechnologyFrontMatter

        technologiesCache.set(slug, {
            slug,
            name: frontMatter.name,
            name_aliases: frontMatter.name_aliases,
            title: frontMatter.title,
            description: frontMatter.description,
            meta_title: frontMatter.meta_title,
            meta_description: frontMatter.meta_description,
            long_description: frontMatter.long_description,
            url: frontMatter.url,
            reasons: frontMatter.reasons,
            content,
        })
    }

    return technologiesCache
}

// Get all technology slugs
export function getAllTechnologySlugs(): string[] {
    const cache = loadTechnologiesCache()
    return Array.from(cache.keys())
}

// Get a single technology by slug
export async function getTechnologyBySlug(slug: string): Promise<Technology | null> {
    const cache = loadTechnologiesCache()
    return cache.get(slug) ?? null
}

// Get all technologies
export async function getAllTechnologies(): Promise<Technology[]> {
    const cache = loadTechnologiesCache()
    return Array.from(cache.values()).sort((a, b) => a.name.localeCompare(b.name))
}

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const clientsDirectory = path.join(process.cwd(), 'content/clients')

export interface Client {
    slug: string
    name: string
    logo?: string
    sector: string
    description: string
}

interface ClientFrontMatter {
    name: string
    slug: string
    logo?: string
    sector: string
    description: string
}

// In-memory cache for clients (loaded once per build)
let clientsCache: Map<string, Client> | null = null

// Load all clients into cache
function loadClientsCache(): Map<string, Client> {
    if (clientsCache) {
        return clientsCache
    }

    clientsCache = new Map()

    if (!fs.existsSync(clientsDirectory)) {
        return clientsCache
    }

    const fileNames = fs.readdirSync(clientsDirectory)
    const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'))

    for (const fileName of mdxFiles) {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(clientsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        const frontMatter = data as ClientFrontMatter

        clientsCache.set(slug, {
            slug,
            name: frontMatter.name,
            logo: frontMatter.logo,
            sector: frontMatter.sector,
            description: frontMatter.description,
        })
    }

    return clientsCache
}

// Get a single client by slug
export async function getClientBySlug(slug: string): Promise<Client | null> {
    const cache = loadClientsCache()
    return cache.get(slug) ?? null
}

// Get all clients
export async function getAllClients(): Promise<Client[]> {
    const cache = loadClientsCache()
    return Array.from(cache.values()).sort((a, b) => a.name.localeCompare(b.name))
}

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

// Ensure client directory exists
function ensureClientDirectory() {
    if (!fs.existsSync(clientsDirectory)) {
        fs.mkdirSync(clientsDirectory, { recursive: true })
    }
}

// Get all client slugs
function getAllClientSlugs(): string[] {
    ensureClientDirectory()
    if (!fs.existsSync(clientsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(clientsDirectory)
    return fileNames.filter((fileName) => fileName.endsWith('.mdx')).map((fileName) => fileName.replace(/\.mdx$/, ''))
}

// Get a single client by slug
export async function getClientBySlug(slug: string): Promise<Client | null> {
    ensureClientDirectory()
    const fullPath = path.join(clientsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    const frontMatter = data as ClientFrontMatter

    return {
        slug,
        name: frontMatter.name,
        logo: frontMatter.logo,
        sector: frontMatter.sector,
        description: frontMatter.description,
    }
}

// Get all clients
export async function getAllClients(): Promise<Client[]> {
    const slugs = getAllClientSlugs()
    const clients = await Promise.all(slugs.map((slug) => getClientBySlug(slug)))

    return clients.filter((client): client is Client => client !== null).sort((a, b) => a.name.localeCompare(b.name))
}

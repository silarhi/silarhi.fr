import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const clientsDirectory = path.join(process.cwd(), 'src/content/clients')

export interface ClientMetadata {
    slug: string
    name: string
    logo?: string
    content: string
}

interface ClientFrontMatter {
    name: string
    slug: string
    logo?: string
}

// Ensure client directory exists
function ensureClientDirectory() {
    if (!fs.existsSync(clientsDirectory)) {
        fs.mkdirSync(clientsDirectory, { recursive: true })
    }
}

// Get all client slugs
export function getAllClientSlugs(): string[] {
    ensureClientDirectory()
    if (!fs.existsSync(clientsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(clientsDirectory)
    return fileNames.filter((fileName) => fileName.endsWith('.mdx')).map((fileName) => fileName.replace(/\.mdx$/, ''))
}

// Get a single client by slug
export async function getClientBySlug(slug: string): Promise<ClientMetadata | null> {
    ensureClientDirectory()
    const fullPath = path.join(clientsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const frontMatter = data as ClientFrontMatter

    return {
        slug,
        name: frontMatter.name,
        logo: frontMatter.logo,
        content,
    }
}

// Get all clients
export async function getAllClients(): Promise<ClientMetadata[]> {
    const slugs = getAllClientSlugs()
    const clients = await Promise.all(slugs.map((slug) => getClientBySlug(slug)))

    return clients
        .filter((client): client is ClientMetadata => client !== null)
        .sort((a, b) => a.name.localeCompare(b.name))
}

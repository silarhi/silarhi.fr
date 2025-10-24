import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const technologiesDirectory = path.join(process.cwd(), 'src/content/technologies')

export interface TechnologyMetadata {
    slug: string
    name: string
    content: string
}

interface TechnologyFrontMatter {
    name: string
}

// Ensure technology directory exists
function ensureTechnologyDirectory() {
    if (!fs.existsSync(technologiesDirectory)) {
        fs.mkdirSync(technologiesDirectory, { recursive: true })
    }
}

// Get all technology slugs
export function getAllTechnologySlugs(): string[] {
    ensureTechnologyDirectory()
    if (!fs.existsSync(technologiesDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(technologiesDirectory)
    return fileNames.filter((fileName) => fileName.endsWith('.mdx')).map((fileName) => fileName.replace(/\.mdx$/, ''))
}

// Get a single technology by slug
export async function getTechnologyBySlug(slug: string): Promise<TechnologyMetadata | null> {
    ensureTechnologyDirectory()
    const fullPath = path.join(technologiesDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const frontMatter = data as TechnologyFrontMatter

    return {
        slug,
        name: frontMatter.name ?? slug,
        content,
    }
}

// Get all technologies
export async function getAllTechnologies(): Promise<TechnologyMetadata[]> {
    const slugs = getAllTechnologySlugs()
    const technologies = await Promise.all(slugs.map((slug) => getTechnologyBySlug(slug)))

    return technologies
        .filter((technology): technology is TechnologyMetadata => technology !== null)
        .sort((a, b) => a.name.localeCompare(b.name))
}

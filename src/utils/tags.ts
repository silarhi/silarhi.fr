import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const tagsDirectory = path.join(process.cwd(), 'src/content/tags')

export interface TagMetadata {
    name: string
    slug: string
    description?: string
    color?: string
    icon?: string
}

export interface TagFrontMatter {
    name: string
    description?: string
    color?: string
    icon?: string
}

// Ensure tags directory exists
export function ensureTagsDirectory() {
    if (!fs.existsSync(tagsDirectory)) {
        fs.mkdirSync(tagsDirectory, { recursive: true })
    }
}

// Get tag metadata by slug
export async function getTagBySlug(slug: string): Promise<TagMetadata> {
    ensureTagsDirectory()
    const fullPath = path.join(tagsDirectory, `${slug.toLowerCase()}.md`)

    if (!fs.existsSync(fullPath)) {
        return {
            name: slug,
            slug: slug.toLowerCase(),
        }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    const frontMatter = data as TagFrontMatter

    return {
        ...frontMatter,
        slug: slug.toLowerCase(),
    }
}

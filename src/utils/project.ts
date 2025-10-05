import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { getTagBySlug, type TagMetadata } from './tags'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

export interface ProjectProject {
    slug: string
    title: string
    date: string
    updateDate?: string
    excerpt?: string
    author: string
    tags: TagMetadata[]
    published: boolean
    content: string
    readingTime: string
}

interface ProjectFrontMatter {
    title: string
    date: string
    updateDate?: string
    excerpt?: string
    author?: string
    tags?: string[]
    published?: boolean
}

// Ensure project directory exists
function ensureProjectDirectory() {
    if (!fs.existsSync(projectsDirectory)) {
        fs.mkdirSync(projectsDirectory, { recursive: true })
    }
}

// Get all project project slugs
export function getAllProjectSlugs(): string[] {
    ensureProjectDirectory()
    if (!fs.existsSync(projectsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    return fileNames.filter((fileName) => fileName.endsWith('.mdx')).map((fileName) => fileName.replace(/\.mdx$/, ''))
}

// Calculate reading time
function calculateReadingTime(content: string): string {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min de lecture`
}

// Get a single project project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectProject | null> {
    ensureProjectDirectory()
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const frontMatter = data as ProjectFrontMatter

    // Only return published projects or if published is not defined
    if (frontMatter.published === false) {
        return null
    }

    const readingTime = calculateReadingTime(content)

    // Lookup tag metadata for each tag
    const tagSlugs = frontMatter.tags ?? []
    const tags = await Promise.all(tagSlugs.map(async (tagSlug) => await getTagBySlug(tagSlug)))

    return {
        slug,
        ...frontMatter,
        author: frontMatter.author ?? 'SILARHI',
        tags,
        published: frontMatter.published ?? false,
        content,
        readingTime,
    }
}

// Get all project projects
export async function getAllProjects(): Promise<ProjectProject[]> {
    const slugs = getAllProjectSlugs()
    const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(slug)))

    return projects
        .filter((project): project is ProjectProject => project !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get projects by tag
export async function getProjectsByTag(tag: string): Promise<ProjectProject[]> {
    const allProjects = await getAllProjects()
    return allProjects.filter((project) =>
        project.tags.some((projectTag) => projectTag.slug.toLowerCase() === tag.toLowerCase())
    )
}

// Get all unique tags
export async function getAllProjectTags(): Promise<TagMetadata[]> {
    const allProjects = await getAllProjects()
    const tagSlugs = {} as Record<string, TagMetadata>

    allProjects.forEach((project) => {
        project.tags.forEach((tag) => (tagSlugs[tag.slug] = tag))
    })

    return Object.values(tagSlugs).sort((a, b) => a.slug.localeCompare(b.slug))
}

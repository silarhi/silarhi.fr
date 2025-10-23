import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { type ClientMetadata, getClientBySlug } from './client'
import { getTagBySlug, type TagMetadata } from './tags'
import { getTechnologyBySlug, type TechnologyMetadata } from './technology'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

interface ProjectTask {
    slug: string
    title: string
    date: string
    project: string
    content: string
}

export interface ProjectEngagement {
    type: string
    description: string
    deliverables?: string[]
    ongoing?: string[]
}

export interface ProjectChallenge {
    title?: string
    description?: string
    points?: string[]
}

export interface ProjectSolution {
    title?: string
    description?: string
    points?: string[]
}

export interface ProjectResults {
    title?: string
    description?: string
    metrics?: Array<{
        label: string
        value: string
    }>
}

export interface ProjectTestimonial {
    quote: string
    author: string
    company: string
}

export interface ProjectProject {
    slug: string
    title: string
    date: string
    projectDate?: string
    updateDate?: string
    excerpt?: string
    author: string
    client?: ClientMetadata
    technologies: TechnologyMetadata[]
    tags: TagMetadata[]
    published: boolean
    content: string
    readingTime: string
    tasks: ProjectTask[]
    // New fields for enhanced project display
    projectType?: 'one-shot' | 'recurring'
    category?: string
    year?: string
    duration?: string
    engagement?: ProjectEngagement
    image?: string
    overview?: string
    challenge?: ProjectChallenge
    solution?: ProjectSolution
    results?: ProjectResults
    testimonial?: ProjectTestimonial
}

interface ProjectFrontMatter {
    title: string
    date: string
    projectDate?: string
    updateDate?: string
    excerpt?: string
    author?: string
    client?: string
    technologies?: string[]
    tags?: string[]
    published?: boolean
    // New optional fields
    projectType?: 'one-shot' | 'recurring'
    category?: string
    year?: string
    duration?: string
    engagement?: ProjectEngagement
    image?: string
    overview?: string
    challenge?: ProjectChallenge
    solution?: ProjectSolution
    results?: ProjectResults
    testimonial?: ProjectTestimonial
}

interface TaskFrontMatter {
    title: string
    date: string
    project: string
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

    const entries = fs.readdirSync(projectsDirectory, { withFileTypes: true })
    return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((dirName) => fs.existsSync(path.join(projectsDirectory, dirName, 'index.mdx')))
}

// Get all tasks for a project
async function getProjectTasks(projectSlug: string): Promise<ProjectTask[]> {
    const projectDir = path.join(projectsDirectory, projectSlug)

    if (!fs.existsSync(projectDir)) {
        return []
    }

    const files = fs.readdirSync(projectDir)
    const taskFiles = files.filter((file) => file.endsWith('.mdx') && file !== 'index.mdx')

    const tasks = await Promise.all(
        taskFiles.map(async (file) => {
            const fullPath = path.join(projectDir, file)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)
            const frontMatter = data as TaskFrontMatter

            return {
                slug: file.replace(/\.mdx$/, ''),
                title: frontMatter.title,
                date: frontMatter.date,
                project: frontMatter.project,
                content,
            }
        })
    )

    // Sort tasks by date (oldest first for chronological order)
    return tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
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
    const fullPath = path.join(projectsDirectory, slug, 'index.mdx')

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

    // Lookup client metadata if specified
    const client = frontMatter.client ? await getClientBySlug(frontMatter.client) : undefined

    // Lookup technology metadata for each technology
    const technologySlugs = frontMatter.technologies ?? []
    const technologies = await Promise.all(technologySlugs.map(async (techSlug) => await getTechnologyBySlug(techSlug)))

    // Get all tasks for this project
    const tasks = await getProjectTasks(slug)

    return {
        slug,
        ...frontMatter,
        author: frontMatter.author ?? 'SILARHI',
        client: client ?? undefined,
        technologies: technologies.filter((tech): tech is TechnologyMetadata => tech !== null),
        tags,
        published: frontMatter.published ?? false,
        content,
        readingTime,
        tasks,
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

// Get projects by client
export async function getProjectsByClient(clientSlug: string): Promise<ProjectProject[]> {
    const allProjects = await getAllProjects()
    return allProjects.filter((project) => project.client?.slug === clientSlug)
}

// Get projects by technology
export async function getProjectsByTechnology(technologySlug: string): Promise<ProjectProject[]> {
    const allProjects = await getAllProjects()
    return allProjects.filter((project) =>
        project.technologies.some((tech) => tech.slug.toLowerCase() === technologySlug.toLowerCase())
    )
}

import fs from 'fs'
import matter from 'gray-matter'
import { StaticImageData } from 'next/image'
import path from 'path'

import { type Client, getClientBySlug } from './client'
import { getTechnologyBySlug, type Technology } from './technology'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export type ProjectScope =
    | 'full_development'
    | 'feature_integration'
    | 'takeover_and_evolution'
    | 'maintenance_and_support'
type CodeOwnership = 'from_scratch' | 'shared_codebase' | 'inherited_codebase'
type EngagementType = 'project_based' | 'continuous_support' | 'consulting'

// Helper function to get engagement type label in French
export function getEngagementTypeLabel(type: EngagementType): string {
    const labels = {
        project_based: 'Projet à périmètre défini',
        continuous_support: 'Support continu',
        consulting: 'Consulting',
    }
    return labels[type]
}

interface ProjectIteration {
    slug: string
    title: string
    date: Date
    project: string
    content: string
}

interface ProjectEngagement {
    type: EngagementType
    description: string
    deliverables: string[]
}

interface ProjectChallenge {
    description: string
    points: string[]
}

interface ProjectSolution {
    description: string
    points: string[]
}

export interface Project {
    slug: string
    title: string
    date: Date
    excerpt: string
    client: Client
    technologies: Technology[]
    published: boolean
    content: string
    iterations: ProjectIteration[]
    scope: ProjectScope
    codeOwnership: CodeOwnership
    category: string
    url?: string
    name?: string
    duration?: string
    engagement: ProjectEngagement
    image?: string | StaticImageData
    overview: string
    challenge: ProjectChallenge
    solution: ProjectSolution
}

interface ProjectFrontMatter {
    title: string
    date: string
    excerpt: string
    client: string
    technologies: string[]
    published: boolean
    scope: ProjectScope
    codeOwnership: CodeOwnership
    category: string
    url?: string
    name?: string
    duration?: string
    engagement: ProjectEngagement
    image?: string
    overview: string
    challenge: ProjectChallenge
    solution: ProjectSolution
}

interface IterationFrontMatter {
    title: string
    date: string
    project: string
}

// In-memory cache for projects (loaded once per build)
let projectsCache: Map<string, Project> | null = null

// Get all project slugs by scanning directories that contain index.mdx
function scanProjectSlugs(): string[] {
    if (!fs.existsSync(projectsDirectory)) {
        return []
    }

    const entries = fs.readdirSync(projectsDirectory, { withFileTypes: true })
    const slugs: string[] = []

    for (const entry of entries) {
        if (entry.isDirectory()) {
            const indexPath = path.join(projectsDirectory, entry.name, 'index.mdx')
            if (fs.existsSync(indexPath)) {
                slugs.push(entry.name)
            }
        }
    }

    return slugs
}

// Parse iterations from a project directory (reads files in one pass)
function parseProjectIterations(projectDir: string): ProjectIteration[] {
    const files = fs.readdirSync(projectDir)
    const iterationFiles = files.filter((file) => file.endsWith('.mdx') && file !== 'index.mdx')

    const iterations: ProjectIteration[] = []

    for (const file of iterationFiles) {
        const fullPath = path.join(projectDir, file)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const frontMatter = data as IterationFrontMatter

        iterations.push({
            slug: file.replace(/\.mdx$/, ''),
            title: frontMatter.title,
            date: new Date(frontMatter.date),
            project: frontMatter.project,
            content,
        })
    }

    // Sort iterations by date (oldest first for chronological order)
    return iterations.sort((a, b) => a.date.getTime() - b.date.getTime())
}

// Load all projects into cache (single filesystem scan)
async function loadProjectsCache(): Promise<Map<string, Project>> {
    if (projectsCache) {
        return projectsCache
    }

    projectsCache = new Map()
    const slugs = scanProjectSlugs()

    for (const slug of slugs) {
        const projectDir = path.join(projectsDirectory, slug)
        const indexPath = path.join(projectDir, 'index.mdx')
        const fileContents = fs.readFileSync(indexPath, 'utf8')
        const { data, content } = matter(fileContents)
        const frontMatter = data as ProjectFrontMatter

        // Skip unpublished projects
        if (!frontMatter.published) {
            continue
        }

        // Lookup client metadata (uses cached client data)
        const client = await getClientBySlug(frontMatter.client)
        if (!client) {
            continue
        }

        // Lookup technology metadata (uses cached technology data)
        const technologies = await Promise.all(
            frontMatter.technologies.map((techSlug) => getTechnologyBySlug(techSlug))
        )

        // Get iterations from the same directory scan
        const iterations = parseProjectIterations(projectDir)

        projectsCache.set(slug, {
            slug,
            title: frontMatter.title,
            date: new Date(frontMatter.date),
            excerpt: frontMatter.excerpt,
            client,
            url: frontMatter.url,
            technologies: technologies.filter((tech): tech is Technology => tech !== null),
            published: frontMatter.published,
            content,
            iterations,
            scope: frontMatter.scope,
            codeOwnership: frontMatter.codeOwnership,
            category: frontMatter.category,
            name: frontMatter.name,
            duration: frontMatter.duration,
            engagement: frontMatter.engagement,
            image: frontMatter.image,
            overview: frontMatter.overview,
            challenge: frontMatter.challenge,
            solution: frontMatter.solution,
        })
    }

    return projectsCache
}

// Get all project slugs
export function getAllProjectSlugs(): string[] {
    // If cache exists, return cached slugs; otherwise scan filesystem
    if (projectsCache) {
        return Array.from(projectsCache.keys())
    }
    return scanProjectSlugs()
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const cache = await loadProjectsCache()
    return cache.get(slug) ?? null
}

// Get all project projects
export async function getAllProjects(): Promise<Project[]> {
    const cache = await loadProjectsCache()
    return Array.from(cache.values()).sort((a, b) => b.date.getTime() - a.date.getTime())
}

// Get projects by technology
export async function getProjectsByTechnology(technologySlug: string): Promise<Project[]> {
    const allProjects = await getAllProjects()
    return allProjects.filter((project) =>
        project.technologies.some((tech) => tech.slug.toLowerCase() === technologySlug.toLowerCase())
    )
}

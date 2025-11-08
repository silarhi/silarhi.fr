import fs from 'fs'
import matter from 'gray-matter'
import { StaticImageData } from 'next/image'
import path from 'path'

import { type ClientMetadata, getClientBySlug } from './client'
import { getTechnologyBySlug, type TechnologyMetadata } from './technology'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

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
    client: ClientMetadata
    technologies: TechnologyMetadata[]
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

// Get all project slugs
export function getAllProjectSlugs(): string[] {
    const entries = fs.readdirSync(projectsDirectory, { withFileTypes: true })
    return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((dirName) => fs.existsSync(path.join(projectsDirectory, dirName, 'index.mdx')))
}

// Get all iterations for a project
async function getProjectIterations(projectSlug: string): Promise<ProjectIteration[]> {
    const projectDir = path.join(projectsDirectory, projectSlug)

    if (!fs.existsSync(projectDir)) {
        return []
    }

    const files = fs.readdirSync(projectDir)
    const iterationFiles = files.filter((file) => file.endsWith('.mdx') && file !== 'index.mdx')

    const iterations = await Promise.all(
        iterationFiles.map(async (file) => {
            const fullPath = path.join(projectDir, file)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)
            const frontMatter = data as IterationFrontMatter

            return {
                slug: file.replace(/\.mdx$/, ''),
                title: frontMatter.title,
                date: new Date(frontMatter.date),
                project: frontMatter.project,
                content,
            }
        })
    )

    // Sort iterations by date (oldest first for chronological order)
    return iterations.sort((a, b) => a.date.getTime() - b.date.getTime())
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const fullPath = path.join(projectsDirectory, slug, 'index.mdx')

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const frontMatter = data as ProjectFrontMatter

    // Only return published projects or if published is not defined
    if (!frontMatter.published) {
        return null
    }

    // Lookup client metadata
    const client = await getClientBySlug(frontMatter.client)

    if (!client) {
        return null
    }

    // Lookup technology metadata for each technology
    const technologies = await Promise.all(frontMatter.technologies.map((techSlug) => getTechnologyBySlug(techSlug)))

    // Get all iterations for this project
    const iterations = await getProjectIterations(slug)

    return {
        slug,
        title: frontMatter.title,
        date: new Date(frontMatter.date),
        excerpt: frontMatter.excerpt,
        client,
        url: frontMatter.url,
        technologies: technologies.filter((tech): tech is TechnologyMetadata => tech !== null),
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
    }
}

// Get all project projects
export async function getAllProjects(): Promise<Project[]> {
    const slugs = getAllProjectSlugs()
    const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(slug)))

    return projects
        .filter((project): project is Project => project !== null)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
}

// Get projects by technology
export async function getProjectsByTechnology(technologySlug: string): Promise<Project[]> {
    const allProjects = await getAllProjects()
    return allProjects.filter((project) =>
        project.technologies.some((tech) => tech.slug.toLowerCase() === technologySlug.toLowerCase())
    )
}

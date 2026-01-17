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

export interface ImageMetadata {
    blur: string
    width: number
    height: number
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
    imageMetadata?: ImageMetadata
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
    image_metadata?: ImageMetadata
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
let projectsCachePromise: Promise<Map<string, Project>> | null = null

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
function loadProjectsCache(): Promise<Map<string, Project>> {
    if (!projectsCachePromise) {
        projectsCachePromise = (async () => {
            const cache = new Map<string, Project>()
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

                cache.set(slug, {
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
                    imageMetadata: frontMatter.image_metadata,
                    overview: frontMatter.overview,
                    challenge: frontMatter.challenge,
                    solution: frontMatter.solution,
                })
            }

            return cache
        })()
    }
    return projectsCachePromise
}

// Get all project slugs
export async function getAllProjectSlugs(): Promise<string[]> {
    if (projectsCachePromise) {
        const cache = await projectsCachePromise
        return Array.from(cache.keys())
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

// Get projects by client slug (efficient lookup without loading all projects for counting)
export async function getProjectsByClient(clientSlug: string): Promise<Project[]> {
    const allProjects = await getAllProjects()
    return allProjects.filter((project) => project.client.slug === clientSlug)
}

// Pre-computed filter data interface
interface FilterItemWithCount {
    slug: string
    name: string
    projectCount: number
}

interface ProjectFilterData {
    technologies: FilterItemWithCount[]
    categories: FilterItemWithCount[]
    industries: FilterItemWithCount[]
    clients: FilterItemWithCount[]
    projects: Project[]
}

// In-memory cache for filter data (computed once per build)
let filterDataCache: ProjectFilterData | null = null

// Client link data for efficient rendering
export interface ClientLinkData {
    slug: string
    link: string
    projectCount: number
}

// Pre-compute client links (for single project -> direct link, multiple -> filter link)
export async function getClientLinksData(): Promise<Map<string, ClientLinkData>> {
    const allProjects = await getAllProjects()
    const clientProjectsMap = new Map<string, { projects: Project[]; slug: string }>()

    // Group projects by client
    for (const project of allProjects) {
        const clientSlug = project.client.slug
        const existing = clientProjectsMap.get(clientSlug)
        if (existing) {
            existing.projects.push(project)
        } else {
            clientProjectsMap.set(clientSlug, { projects: [project], slug: clientSlug })
        }
    }

    // Convert to link data
    const result = new Map<string, ClientLinkData>()
    for (const [clientSlug, data] of clientProjectsMap) {
        const link = data.projects.length === 1 ? `/projets/${data.projects[0].slug}` : `/projets?client=${clientSlug}`
        result.set(clientSlug, {
            slug: clientSlug,
            link,
            projectCount: data.projects.length,
        })
    }

    return result
}

// Get all filter data with counts in a single pass (O(n) instead of O(n×m))
export async function getProjectFilterData(): Promise<ProjectFilterData> {
    if (filterDataCache) {
        return filterDataCache
    }

    const allProjects = await getAllProjects()

    // Initialize counters using Maps for O(1) lookups
    const techCounts = new Map<string, { slug: string; name: string; projectCount: number }>()
    const categoryCounts = new Map<string, { slug: string; name: string; projectCount: number }>()
    const industryCounts = new Map<string, { slug: string; name: string; projectCount: number }>()
    const clientCounts = new Map<string, { slug: string; name: string; projectCount: number }>()

    // Single pass through all projects to compute all counts
    for (const project of allProjects) {
        // Count technologies
        for (const tech of project.technologies) {
            const existing = techCounts.get(tech.slug)
            if (existing) {
                existing.projectCount++
            } else {
                techCounts.set(tech.slug, {
                    slug: tech.slug,
                    name: tech.name,
                    projectCount: 1,
                })
            }
        }

        // Count categories
        if (project.category) {
            const slug = project.category.toLowerCase().replace(/\s+/g, '-')
            const existing = categoryCounts.get(slug)
            if (existing) {
                existing.projectCount++
            } else {
                categoryCounts.set(slug, {
                    slug,
                    name: project.category,
                    projectCount: 1,
                })
            }
        }

        // Count industries
        const industry = project.client.sector
        if (industry) {
            const slug = industry.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
            const existing = industryCounts.get(slug)
            if (existing) {
                existing.projectCount++
            } else {
                industryCounts.set(slug, {
                    slug,
                    name: industry,
                    projectCount: 1,
                })
            }
        }

        // Count clients
        const clientSlug = project.client.slug
        const existing = clientCounts.get(clientSlug)
        if (existing) {
            existing.projectCount++
        } else {
            clientCounts.set(clientSlug, {
                slug: clientSlug,
                name: project.client.name,
                projectCount: 1,
            })
        }
    }

    // Convert Maps to sorted arrays (filter out items with 0 projects)
    const technologies = Array.from(techCounts.values())
        .filter((t) => t.projectCount > 0)
        .sort((a, b) => a.name.localeCompare(b.name))

    const categories = Array.from(categoryCounts.values())
        .filter((c) => c.projectCount > 0)
        .sort((a, b) => a.name.localeCompare(b.name))

    const industries = Array.from(industryCounts.values())
        .filter((i) => i.projectCount > 0)
        .sort((a, b) => a.name.localeCompare(b.name))

    const clients = Array.from(clientCounts.values())
        .filter((c) => c.projectCount > 0)
        .sort((a, b) => a.name.localeCompare(b.name))

    filterDataCache = {
        technologies,
        categories,
        industries,
        clients,
        projects: allProjects,
    }

    return filterDataCache
}

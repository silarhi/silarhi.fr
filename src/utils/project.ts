import fs from 'fs'
import type { StaticImageData } from 'next/image'
import path from 'path'
import * as v from 'valibot'

import { type Client, getClientBySlug } from './client'
import {
    contentDirectory,
    type ImageMetadata,
    imageMetadataSchema,
    isoDate,
    lazy,
    optionalText,
    parseFrontMatter,
    readMdxDirectory,
    readMdxFile,
    requiredText,
} from './content'
import { getTechnologyBySlug, type Technology } from './technology'

const projectsDirectory = path.join(contentDirectory, 'projects')

const scopeSchema = v.picklist([
    'full_development',
    'feature_integration',
    'takeover_and_evolution',
    'maintenance_and_support',
])
const engagementTypeSchema = v.picklist(['project_based', 'continuous_support', 'consulting'])
const pointsSchema = v.object({ description: requiredText, points: v.array(requiredText) })

// Source of truth of the project front matter (content/projects/<slug>/index.mdx)
const projectFrontMatterSchema = v.object({
    title: requiredText,
    date: isoDate,
    endDate: v.optional(isoDate),
    excerpt: requiredText,
    client: requiredText,
    technologies: v.array(requiredText),
    published: v.boolean(),
    scope: scopeSchema,
    codeOwnership: v.picklist(['from_scratch', 'shared_codebase', 'inherited_codebase']),
    category: requiredText,
    url: v.optional(v.pipe(v.string(), v.url())),
    name: optionalText,
    engagement: v.object({
        type: engagementTypeSchema,
        description: requiredText,
        deliverables: v.array(requiredText),
    }),
    image: optionalText,
    image_metadata: v.optional(imageMetadataSchema),
    overview: requiredText,
    challenge: pointsSchema,
    solution: pointsSchema,
})

// Iteration files (content/projects/<slug>/v1.mdx, …): only an explicit `published: false` hides one
const iterationFrontMatterSchema = v.object({
    title: requiredText,
    date: isoDate,
})

type ProjectFrontMatter = v.InferOutput<typeof projectFrontMatterSchema>
export type ProjectScope = v.InferOutput<typeof scopeSchema>
type EngagementType = v.InferOutput<typeof engagementTypeSchema>

// Helper function to get engagement type label in French
export function getEngagementTypeLabel(type: EngagementType): string {
    const labels = {
        project_based: 'Projet à périmètre défini',
        continuous_support: 'Support continu',
        consulting: 'Consulting',
    }
    return labels[type]
}

// Frontmatter dates are parsed as UTC midnight, so format them in UTC
const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', timeZone: 'UTC' })
const monthYearFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' })

// Format the engagement period: "2019" or "2019 – 2024" by year, "avril 2019" or "avril 2019 – juillet 2024" by month
export function formatProjectPeriod(
    { date, endDate }: Pick<Project, 'date' | 'endDate'>,
    precision: 'year' | 'month'
): string {
    if (precision === 'year') {
        const startYear = date.getUTCFullYear()
        const endYear = endDate?.getUTCFullYear()
        return endYear && endYear !== startYear ? `${startYear} – ${endYear}` : `${startYear}`
    }

    if (!endDate) {
        return monthYearFormatter.format(date)
    }
    if (date.getUTCFullYear() !== endDate.getUTCFullYear()) {
        return `${monthYearFormatter.format(date)} – ${monthYearFormatter.format(endDate)}`
    }
    if (date.getUTCMonth() !== endDate.getUTCMonth()) {
        return `${monthFormatter.format(date)} – ${monthYearFormatter.format(endDate)}`
    }
    return monthYearFormatter.format(endDate)
}

const dayInMs = 24 * 60 * 60 * 1000
const averageMonthInDays = 365.25 / 12

// Format the length of an ended engagement: in weeks under four weeks ("2 semaines"), else rounded to the month
// ("7 mois", "1 an", "2 ans et 3 mois")
export function formatProjectDuration(date: Date, endDate: Date): string {
    const days = (endDate.getTime() - date.getTime()) / dayInMs
    if (days < 28) {
        const weeks = Math.max(1, Math.round(days / 7))
        return weeks > 1 ? `${weeks} semaines` : '1 semaine'
    }

    const months = Math.round(days / averageMonthInDays)
    if (months < 12) {
        return `${months} mois`
    }

    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    const yearsLabel = years > 1 ? `${years} ans` : '1 an'
    return remainingMonths ? `${yearsLabel} et ${remainingMonths} mois` : yearsLabel
}

interface ProjectIteration extends v.InferOutput<typeof iterationFrontMatterSchema> {
    slug: string
    content: string
}

export interface Project extends Omit<ProjectFrontMatter, 'client' | 'technologies' | 'image' | 'image_metadata'> {
    slug: string
    client: Client
    technologies: Technology[]
    content: string
    iterations: ProjectIteration[]
    image?: string | StaticImageData
    imageMetadata?: ImageMetadata
}

// Query param value of a category filter ("Gestion documentaire" → "gestion-documentaire")
export function getCategorySlug(category: string): string {
    return category.toLowerCase().replace(/\s+/g, '-')
}

// Query param value of an industry filter, from the client sector ("Banque & Finance" → "banque-and-finance")
export function getIndustrySlug(sector: string): string {
    return getCategorySlug(sector).replace(/&/g, 'and')
}

// Published iterations of a project, oldest first
function loadProjectIterations(projectDirectory: string): ProjectIteration[] {
    return readMdxDirectory(projectDirectory)
        .filter((file) => file.data.published !== false)
        .map((file) => ({
            slug: file.slug,
            ...parseFrontMatter(iterationFrontMatterSchema, file),
            content: file.content,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
}

// Published projects whose client exists, keyed by directory name (drafts are not validated)
const loadProjects = lazy(async () => {
    const projects = new Map<string, Project>()
    const entries = fs.existsSync(projectsDirectory) ? fs.readdirSync(projectsDirectory, { withFileTypes: true }) : []

    for (const entry of entries) {
        const projectDirectory = path.join(projectsDirectory, entry.name)
        const indexPath = path.join(projectDirectory, 'index.mdx')
        if (!entry.isDirectory() || !fs.existsSync(indexPath)) {
            continue
        }

        const file = readMdxFile(indexPath)
        if (!file.data.published) {
            continue
        }

        const {
            client: clientSlug,
            technologies: technologySlugs,
            image_metadata,
            ...frontMatter
        } = parseFrontMatter(projectFrontMatterSchema, file)
        const client = await getClientBySlug(clientSlug)
        if (!client) {
            continue
        }

        const technologies = await Promise.all(technologySlugs.map((techSlug) => getTechnologyBySlug(techSlug)))

        projects.set(entry.name, {
            ...frontMatter,
            slug: entry.name,
            client,
            technologies: technologies.filter((tech): tech is Technology => tech !== null),
            imageMetadata: image_metadata,
            content: file.content,
            iterations: loadProjectIterations(projectDirectory),
        })
    }

    return projects
})

// Get all project slugs
export async function getAllProjectSlugs(): Promise<string[]> {
    return Array.from((await loadProjects()).keys())
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    return (await loadProjects()).get(slug) ?? null
}

// Get all project projects
export async function getAllProjects(): Promise<Project[]> {
    return Array.from((await loadProjects()).values()).sort((a, b) => b.date.getTime() - a.date.getTime())
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

interface RelatedCandidate {
    slug: string
    category: string
    technologies: { slug: string }[]
}

// A shared category weighs as much as two shared technologies: PHP or Symfony alone link most projects
const SAME_CATEGORY_WEIGHT = 2

/**
 * The projects closest to `project`, by shared technologies and category, the most recent first on a tie
 * (`candidates` are expected newest first). The project itself is left out.
 */
export function rankRelatedProjects<T extends RelatedCandidate>(
    project: RelatedCandidate,
    candidates: T[],
    limit: number
): T[] {
    const technologies = new Set(project.technologies.map((tech) => tech.slug))
    const score = (candidate: RelatedCandidate) =>
        candidate.technologies.filter((tech) => technologies.has(tech.slug)).length +
        (candidate.category === project.category ? SAME_CATEGORY_WEIGHT : 0)

    return candidates
        .filter((candidate) => candidate.slug !== project.slug)
        .map((candidate) => ({ candidate, score: score(candidate) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ candidate }) => candidate)
}

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
    return rankRelatedProjects(project, await getAllProjects(), limit)
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
            const slug = getCategorySlug(project.category)
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
            const slug = getIndustrySlug(industry)
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

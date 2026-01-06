import Fuse from 'fuse.js'
import { redirect } from 'next/navigation'

import ProjectsContent from '@/components/projects-content'
import { getAllProjects } from '@/utils/project'
import { ActiveFilter } from '@/utils/url'

interface ProjectsListAsyncProps {
    searchQuery: string
    currentPage: number
    itemsPerPage: number
    technology?: string
    category?: string
    industry?: string
    client?: string
}

export default async function ProjectsListAsync({
    searchQuery,
    currentPage,
    itemsPerPage,
    technology,
    category,
    industry,
    client,
}: ProjectsListAsyncProps) {
    // Get all projects and filter by search query
    const allProjects = await getAllProjects()
    let filteredProjects = allProjects

    // Determine active filter (only one at a time)
    let activeFilter: ActiveFilter | null = null
    if (technology) {
        activeFilter = { type: 'technology', value: technology }
    } else if (category) {
        activeFilter = { type: 'category', value: category }
    } else if (industry) {
        activeFilter = { type: 'industry', value: industry }
    } else if (client) {
        activeFilter = { type: 'client', value: client }
    }

    // Apply filters if present
    if (technology) {
        filteredProjects = filteredProjects.filter((project) =>
            project.technologies.some((tech) => tech.slug === technology)
        )
    }

    if (category) {
        filteredProjects = filteredProjects.filter(
            (project) => project.category.toLowerCase().replace(/\s+/g, '-') === category
        )
    }

    if (industry) {
        filteredProjects = filteredProjects.filter((project) => {
            const sector = project.client.sector
            return sector.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === industry
        })
    }

    if (client) {
        filteredProjects = filteredProjects.filter((project) => project.client.slug === client)
    }

    // Apply search query if present
    if (searchQuery) {
        const fuse = new Fuse(filteredProjects, {
            keys: [
                { name: 'title', weight: 2 },
                { name: 'name', weight: 1.75 },
                { name: 'overview', weight: 1.5 },
                { name: 'client.name', weight: 1.2 },
                { name: 'technologies.name', weight: 1 },
            ],
            threshold: 0.4,
            includeScore: true,
        })

        const results = fuse.search(searchQuery)
        filteredProjects = results.map((result) => result.item)
    }

    // Calculate total pages
    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage))

    // Redirect if page is out of bounds
    if (currentPage < 1 || (currentPage > totalPages && filteredProjects.length > 0)) {
        const validPage = Math.max(1, Math.min(currentPage, totalPages))
        const redirectParams = new URLSearchParams()
        redirectParams.set('page', validPage.toString())
        if (searchQuery) {
            redirectParams.set('search', searchQuery)
        }
        if (technology) {
            redirectParams.set('technology', technology)
        }
        if (category) {
            redirectParams.set('category', category)
        }
        if (industry) {
            redirectParams.set('industry', industry)
        }
        if (client) {
            redirectParams.set('client', client)
        }
        redirect(`/projets?${redirectParams.toString()}`)
    }

    return (
        <ProjectsContent
            projects={filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
            filteredCount={filteredProjects.length}
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
        />
    )
}

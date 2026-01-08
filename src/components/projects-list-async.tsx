import Fuse from 'fuse.js'
import { redirect } from 'next/navigation'

import ProjectsContent from '@/components/projects-content'
import { getAllProjects } from '@/utils/project'

interface ProjectsListAsyncProps {
    searchQuery: string
    currentPage: number
    itemsPerPage: number
    technology?: string
    category?: string
    industry?: string
    client?: string
    searchParams: string
}

export default async function ProjectsListAsync({
    searchQuery,
    currentPage,
    itemsPerPage,
    technology,
    category,
    industry,
    client,
    searchParams,
}: ProjectsListAsyncProps) {
    // Get all projects and filter by search query
    let filteredProjects = await getAllProjects()

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
        const redirectParams = new URLSearchParams(searchParams)
        redirectParams.set('page', validPage.toString())
        redirect(`/projets?${redirectParams.toString()}`)
    }

    return (
        <ProjectsContent
            projects={filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
            filteredCount={filteredProjects.length}
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
            searchParams={searchParams}
        />
    )
}

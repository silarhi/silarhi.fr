import Fuse from 'fuse.js'

import PaginationServer from '@/components/pagination-server'
import ProjectList from '@/components/project-list'
import { getAllProjects } from '@/utils/project'

interface ProjectsContentProps {
    currentPage: number
    searchQuery: string
    itemsPerPage?: number
}

export default async function ProjectsContent({ currentPage, searchQuery, itemsPerPage = 9 }: ProjectsContentProps) {
    const allProjects = await getAllProjects()

    // Filter projects based on search query using Fuse.js
    let filteredProjects = allProjects

    if (searchQuery) {
        const fuse = new Fuse(allProjects, {
            keys: [
                { name: 'title', weight: 2 },
                { name: 'excerpt', weight: 1.5 },
                { name: 'client.name', weight: 1.2 },
                { name: 'technologies.name', weight: 1 },
                { name: 'tags.name', weight: 0.8 },
            ],
            threshold: 0.4,
            includeScore: true,
        })

        const results = fuse.search(searchQuery)
        filteredProjects = results.map((result) => result.item)
    }

    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const projects = filteredProjects.slice(startIndex, endIndex)

    return (
        <>
            {/* Search result count */}
            {searchQuery && (
                <div className="mb-8">
                    <p className="text-muted text-sm">
                        {filteredProjects.length > 0 ? (
                            <>
                                <span className="font-semibold">{filteredProjects.length}</span>{' '}
                                {filteredProjects.length === 1 ? 'projet trouvé' : 'projets trouvés'} pour{' '}
                                <span className="font-semibold">&ldquo;{searchQuery}&rdquo;</span>
                            </>
                        ) : (
                            <>Aucun projet trouvé pour &ldquo;{searchQuery}&rdquo;</>
                        )}
                    </p>
                </div>
            )}

            {projects.length === 0 ? (
                <div className="py-12 text-center">
                    <svg
                        className="text-muted mx-auto mb-4 h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="text-muted">
                        {searchQuery
                            ? 'Aucun projet ne correspond à votre recherche.'
                            : 'Aucun projet publié pour le moment.'}
                    </p>
                </div>
            ) : (
                <>
                    <ProjectList projects={projects} />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-16">
                            <PaginationServer
                                currentPage={currentPage}
                                totalPages={totalPages}
                                baseUrl="/projets"
                                searchQuery={searchQuery}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    )
}

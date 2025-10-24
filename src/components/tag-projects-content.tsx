import PaginationServer from '@/components/pagination-server'
import ProjectList from '@/components/project-list'
import { getProjectsByTag } from '@/utils/project'

interface TagProjectsContentProps {
    tagSlug: string
    currentPage: number
    itemsPerPage?: number
}

export default async function TagProjectsContent({
    tagSlug,
    currentPage,
    itemsPerPage = 9,
}: TagProjectsContentProps) {
    const allProjects = await getProjectsByTag(tagSlug)

    // Calculate pagination
    const totalPages = Math.ceil(allProjects.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const projects = allProjects.slice(startIndex, endIndex)

    return (
        <>
            {/* Project count */}
            <div className="mb-8">
                <p className="text-muted text-sm">
                    <span className="font-semibold">{allProjects.length}</span>{' '}
                    {allProjects.length === 1 ? 'projet trouvé' : 'projets trouvés'}
                </p>
            </div>

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
                    <p className="text-muted">Aucun projet publié pour le moment.</p>
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
                                baseUrl={`/projets/tag/${tagSlug}`}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    )
}

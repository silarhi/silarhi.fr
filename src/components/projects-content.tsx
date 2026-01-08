import ProjectList from '@/components/project-list'
import { FaceSad } from '@/components/ui/icons'
import Pagination from '@/components/ui/pagination'
import { Project } from '@/utils/project'

interface ProjectsContentProps {
    projects: Project[]
    filteredCount: number
    currentPage: number
    totalPages: number
    searchQuery: string
    searchParams: string
}

export default function ProjectsContent({
    projects,
    filteredCount,
    currentPage,
    totalPages,
    searchQuery,
    searchParams,
}: ProjectsContentProps) {
    return (
        <>
            {/* Search result count */}
            {searchQuery && (
                <div className="mb-8">
                    <p className="text-foreground/80 text-sm">
                        {filteredCount > 0 ? (
                            <>
                                <span className="font-semibold">{filteredCount}</span>{' '}
                                {filteredCount === 1 ? 'projet trouvé' : 'projets trouvés'} pour{' '}
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
                    <FaceSad className="text-foreground/80 mx-auto mb-4 h-16 w-16" />
                    <p className="text-foreground/80">
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
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                baseUrl="/projets"
                                searchParams={searchParams}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    )
}

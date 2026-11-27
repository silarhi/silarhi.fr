import ProjectList from '@/components/project-list'
import Button from '@/components/ui/button'
import { Search } from '@/components/ui/icons'
import Pagination from '@/components/ui/pagination'
import type { Project } from '@/utils/project'

export interface ActiveFilterSummary {
    /** Kind of filter, singular ("Technologie") */
    label: string
    /** Name of the selected value ("Symfony") */
    name: string
}

interface ProjectsContentProps {
    projects: Project[]
    filteredCount: number
    currentPage: number
    totalPages: number
    searchQuery: string
    searchParams: string
    activeFilter: ActiveFilterSummary | null
    /** Technologies offered as a way out of an empty result */
    suggestions: { slug: string; name: string }[]
}

export default function ProjectsContent({
    projects,
    filteredCount,
    currentPage,
    totalPages,
    searchQuery,
    searchParams,
    activeFilter,
    suggestions,
}: ProjectsContentProps) {
    return (
        <>
            {/* Result count of a search or a filter, announced to screen readers as it changes */}
            <div role="status" className="mb-8 empty:hidden">
                {(searchQuery || activeFilter) && (
                    <p className="text-foreground/80 text-sm">
                        {filteredCount > 0 ? (
                            <>
                                <span className="font-semibold">{filteredCount}</span>{' '}
                                {filteredCount === 1 ? 'projet trouvé' : 'projets trouvés'}
                            </>
                        ) : (
                            'Aucun projet trouvé'
                        )}
                        {searchQuery && (
                            <>
                                {' '}
                                pour <span className="font-semibold">&ldquo;{searchQuery}&rdquo;</span>
                            </>
                        )}
                        {activeFilter && (
                            <>
                                {' '}
                                · {activeFilter.label}&nbsp;: <span className="font-semibold">{activeFilter.name}</span>
                            </>
                        )}
                    </p>
                )}
            </div>

            {projects.length === 0 ? (
                <NoProjectFound searchQuery={searchQuery} activeFilter={activeFilter} suggestions={suggestions} />
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

interface NoProjectFoundProps {
    searchQuery: string
    activeFilter: ActiveFilterSummary | null
    suggestions: { slug: string; name: string }[]
}

// Empty result: says what matched nothing, then offers ways out (other technologies, the full list, a message)
function NoProjectFound({ searchQuery, activeFilter, suggestions }: NoProjectFoundProps) {
    return (
        <div className="bg-surface dark:bg-surface-elevated border-border mx-auto max-w-2xl rounded-2xl border px-6 py-12 text-center shadow-sm">
            <span className="bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-primary-light mx-auto mb-6 flex size-14 items-center justify-center rounded-full">
                <Search className="size-6" />
            </span>
            <h2 className="text-foreground mb-3 text-2xl font-bold">
                {searchQuery ? <>Aucun projet pour &ldquo;{searchQuery}&rdquo;</> : 'Aucun projet ne correspond'}
            </h2>
            <p className="text-foreground/80 mb-6">
                {activeFilter
                    ? `Essayez un autre mot-clé, retirez le filtre « ${activeFilter.name} » ou parcourez nos technologies les plus utilisées :`
                    : 'Vérifiez l’orthographe, essayez un mot-clé plus court ou parcourez nos technologies les plus utilisées :'}
            </p>

            {suggestions.length > 0 && (
                <ul className="mb-8 flex flex-wrap justify-center gap-2">
                    {suggestions.map((technology) => (
                        <li key={technology.slug}>
                            <Button
                                as="a"
                                href={`/projets?technology=${technology.slug}`}
                                size="sm"
                                variant="outline-primary"
                                className="rounded-full"
                            >
                                {technology.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button as="a" href="/projets" variant="primary">
                    Voir tous les projets
                </Button>
                <Button as="a" href="/contact" variant="outline-primary">
                    Nous décrire votre besoin
                </Button>
            </div>
            <p className="text-foreground/70 mt-6 mb-0 text-sm">
                Votre besoin n&apos;apparaît pas ici ? Décrivez-le nous : nous vous dirons franchement si c&apos;est
                dans nos cordes.
            </p>
        </div>
    )
}

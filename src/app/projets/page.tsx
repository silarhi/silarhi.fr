import Fuse from 'fuse.js'
import { Metadata } from 'next'

import PaginationServer from '@/components/pagination-server'
import ProjectList from '@/components/project-list'
import ProjectsCTA from '@/components/projects-cta'
import ProjectsHero from '@/components/projects-hero'
import { getAllProjects } from '@/utils/project'

export const metadata: Metadata = {
    title: 'Projets récents - SILARHI',
    description: 'Découvrez nos projets sur le développement web, PHP, Symfony et bien plus encore.',
}

interface ProjectPageProps {
    searchParams: Promise<{ page?: string; search?: string }>
}

const ITEMS_PER_PAGE = 9

export default async function ProjectPage({ searchParams }: ProjectPageProps) {
    const params = await searchParams
    const currentPage = Number(params.page) || 1
    const searchQuery = params.search || ''

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
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const projects = filteredProjects.slice(startIndex, endIndex)

    return (
        <main className="bg-background min-h-screen">
            <ProjectsHero
                badge={
                    <div className="bg-secondary/10 text-secondary-dark inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                        Nos Réalisations
                    </div>
                }
                title="Des projets qui transforment les entreprises"
                description="Découvrez comment nous accompagnons nos clients dans leur transformation digitale avec des solutions sur mesure qui génèrent des résultats concrets."
                showSearch
            >
                {searchQuery && (
                    <div className="mt-4">
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
            </ProjectsHero>

            {/* Projects Grid */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
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
                </div>
            </section>

            <ProjectsCTA />
        </main>
    )
}

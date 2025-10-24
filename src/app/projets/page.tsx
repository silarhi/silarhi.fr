import Fuse from 'fuse.js'
import { Metadata } from 'next'

import FadeInWhenVisible from '@/components/fade-in-when-visible'
import HeroTitle from '@/components/hero-title'
import PaginationServer from '@/components/pagination-server'
import ProjectGrid from '@/components/project-grid'
import SearchForm from '@/components/search-form'
import Section from '@/components/section'
import TagButtonList from '@/components/tag-button-list'
import { getAllProjects, getAllProjectTags } from '@/utils/project'

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
    const tags = await getAllProjectTags()

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
        <>
            <HeroTitle title="Projets récents" subtitle="Découvrez nos derniers projets sur le développement web" />

            <Section>
                {/* Search bar */}
                <FadeInWhenVisible>
                    <div className="mb-8">
                        <SearchForm baseUrl="/projets" />
                    </div>
                </FadeInWhenVisible>

                {/* Results info */}
                {searchQuery && (
                    <FadeInWhenVisible delay={0.05}>
                        <div className="mb-5">
                            <p className="text-sm text-gray-600">
                                {filteredProjects.length > 0 ? (
                                    <>
                                        <span className="font-semibold">{filteredProjects.length}</span>{' '}
                                        {filteredProjects.length === 1 ? 'projet trouvé' : 'projets trouvés'}
                                        {searchQuery && (
                                            <>
                                                {' '}
                                                pour <span className="font-semibold">&ldquo;{searchQuery}&rdquo;</span>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>Aucun projet trouvé pour &ldquo;{searchQuery}&rdquo;</>
                                )}
                            </p>
                        </div>
                    </FadeInWhenVisible>
                )}

                {/* Tags */}
                {tags.length > 0 && !searchQuery && (
                    <FadeInWhenVisible delay={0.1}>
                        <div className="mb-5">
                            <h3 className="mb-3 text-lg">Tous les thèmes</h3>
                            <TagButtonList tags={tags} />
                        </div>
                    </FadeInWhenVisible>
                )}

                {/* Projects grid */}
                {projects.length === 0 ? (
                    <div className="py-12 text-center">
                        <svg
                            className="mx-auto mb-4 h-16 w-16 text-gray-400"
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
                        <p className="text-gray-500">
                            {searchQuery
                                ? 'Aucun projet ne correspond à votre recherche.'
                                : 'Aucun projet publié pour le moment.'}
                        </p>
                    </div>
                ) : (
                    <>
                        <ProjectGrid projects={projects} />

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8">
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
            </Section>
        </>
    )
}

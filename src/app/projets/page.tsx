import Fuse from 'fuse.js'
import { Metadata } from 'next'

import Button from '@/components/button'
import PaginationServer from '@/components/pagination-server'
import SearchForm from '@/components/search-form'
import Section from '@/components/section'
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
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="from-primary/5 bg-gradient-to-b to-white pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="from-primary/10 to-primary/5 mb-6 inline-block rounded-full bg-gradient-to-r px-4 py-1.5 text-sm font-medium text-gray-900">
                            Nos Réalisations
                        </div>
                        <h1 className="mb-6 text-4xl font-bold text-balance text-gray-900 lg:text-6xl">
                            Des projets qui transforment les entreprises
                        </h1>
                        <p className="text-lg leading-relaxed text-gray-600 lg:text-xl">
                            Découvrez comment nous accompagnons nos clients dans leur transformation digitale avec des
                            solutions sur mesure qui génèrent des résultats concrets.
                        </p>

                        {/* Search bar */}
                        <div className="mt-8">
                            <SearchForm baseUrl="/projets" />
                        </div>

                        {/* Results info */}
                        {searchQuery && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">
                                    {filteredProjects.length > 0 ? (
                                        <>
                                            <span className="font-semibold">{filteredProjects.length}</span>{' '}
                                            {filteredProjects.length === 1 ? 'projet trouvé' : 'projets trouvés'}
                                            {searchQuery && (
                                                <>
                                                    {' '}
                                                    pour{' '}
                                                    <span className="font-semibold">&ldquo;{searchQuery}&rdquo;</span>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>Aucun projet trouvé pour &ldquo;{searchQuery}&rdquo;</>
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Projects List */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
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
                            <div className="space-y-24">
                                {projects.map((project, index) => (
                                    <article
                                        key={project.slug}
                                        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                                            index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                                        }`}
                                    >
                                        {/* Image placeholder */}
                                        <div
                                            className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 ${
                                                index % 2 === 1 ? 'lg:col-start-2' : ''
                                            }`}
                                        >
                                            <div className="flex h-full items-center justify-center">
                                                <svg
                                                    className="h-24 w-24 text-gray-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                                            {/* Category badge */}
                                            {project.tags.length > 0 && (
                                                <div className="from-primary/10 to-primary/5 mb-4 inline-block rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-gray-900">
                                                    {project.tags[0].name}
                                                </div>
                                            )}

                                            <h2 className="mb-3 text-3xl font-bold text-gray-900 lg:text-4xl">
                                                {project.title}
                                            </h2>

                                            {project.client && (
                                                <p className="mb-6 text-sm text-gray-600">{project.client.name}</p>
                                            )}

                                            <p className="mb-8 text-lg leading-relaxed text-gray-700">
                                                {project.excerpt}
                                            </p>

                                            {/* Key results if we have tasks */}
                                            {project.tasks.length > 0 && (
                                                <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
                                                    <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-900 uppercase">
                                                        Points Clés
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {project.tasks.slice(0, 3).map((task) => (
                                                            <li key={task.slug} className="flex items-start gap-3">
                                                                <div className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                                                                <span className="font-medium text-gray-900">
                                                                    {task.title}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Technologies tags */}
                                            <div className="mb-6 flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 4).map((tech) => (
                                                    <span
                                                        key={tech.slug}
                                                        className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700"
                                                    >
                                                        {tech.name}
                                                    </span>
                                                ))}
                                            </div>

                                            <Button
                                                as="a"
                                                href={`/projets/${project.slug}`}
                                                variant="outline-primary"
                                                className="group"
                                            >
                                                Voir le cas client
                                                <svg
                                                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </Button>
                                        </div>
                                    </article>
                                ))}
                            </div>

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

            {/* CTA Section */}
            <Section className="from-primary bg-gradient-to-br to-blue-700 text-white">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-bold text-balance lg:text-5xl">Prêt à lancer votre projet ?</h2>
                    <p className="mb-8 text-lg leading-relaxed text-cyan-50 lg:text-xl">
                        Discutons de vos objectifs et découvrez comment nous pouvons vous accompagner dans votre
                        transformation digitale.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button as="a" href="/contact" size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                            Démarrer un projet
                            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Button>
                        <Button
                            as="a"
                            href="/"
                            size="lg"
                            variant="outline-primary"
                            className="border-white bg-transparent text-white hover:bg-white hover:text-gray-900"
                        >
                            Découvrir nos services
                        </Button>
                    </div>
                </div>
            </Section>
        </main>
    )
}

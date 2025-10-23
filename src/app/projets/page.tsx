import Fuse from 'fuse.js'
import { ArrowRight, Repeat, Zap } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/button'
import PaginationServer from '@/components/pagination-server'
import SearchForm from '@/components/search-form'
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
            {/* Hero Section */}
            <section className="from-primary/5 to-background bg-gradient-to-b pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="bg-secondary/10 text-secondary-dark mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                            Nos Réalisations
                        </div>
                        <h1 className="text-foreground mb-6 text-4xl font-bold text-balance lg:text-6xl">
                            Des projets qui transforment les entreprises
                        </h1>
                        <p className="text-muted text-lg leading-relaxed lg:text-xl">
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
                                <p className="text-muted text-sm">
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
                            <div className="space-y-24">
                                {projects.map((project, index) => (
                                    <article
                                        key={project.slug}
                                        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                                            index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                                        }`}
                                    >
                                        {/* Image */}
                                        <div
                                            className={`bg-muted relative aspect-[4/3] overflow-hidden rounded-2xl ${
                                                index % 2 === 1 ? 'lg:col-start-2' : ''
                                            }`}
                                        >
                                            {project.image ? (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <svg
                                                        className="text-muted h-24 w-24"
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
                                            )}

                                            {/* Project type badge on image */}
                                            {project.projectType && (
                                                <div className="absolute top-4 right-4">
                                                    {project.projectType === 'one-shot' ? (
                                                        <div className="text-foreground flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm">
                                                            <Zap className="text-secondary h-3.5 w-3.5" />
                                                            Mission ponctuelle
                                                        </div>
                                                    ) : (
                                                        <div className="text-foreground flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm">
                                                            <Repeat className="text-primary h-3.5 w-3.5" />
                                                            Partenariat continu
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                                            {/* Category badge */}
                                            {project.category ? (
                                                <div className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold">
                                                    {project.category}
                                                </div>
                                            ) : project.tags.length > 0 ? (
                                                <div className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold">
                                                    {project.tags[0].name}
                                                </div>
                                            ) : null}

                                            <h2 className="text-foreground mb-3 text-3xl font-bold lg:text-4xl">
                                                {project.title}
                                            </h2>

                                            {project.client && (
                                                <p className="text-muted mb-6 text-sm">{project.client.name}</p>
                                            )}

                                            <p className="text-foreground/80 mb-8 text-lg leading-relaxed">
                                                {project.excerpt}
                                            </p>

                                            {/* Results - show challenge points if available, otherwise tasks */}
                                            {project.challenge?.points && project.challenge.points.length > 0 ? (
                                                <div className="border-border bg-surface mb-8 rounded-xl border p-6">
                                                    <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                                                        Résultats Clés
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {project.challenge.points.slice(0, 3).map((point, idx) => (
                                                            <li key={idx} className="flex items-start gap-3">
                                                                <div className="bg-secondary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                                                                <span className="text-foreground font-medium">
                                                                    {point}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : project.tasks.length > 0 ? (
                                                <div className="border-border bg-surface mb-8 rounded-xl border p-6">
                                                    <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                                                        Points Clés
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {project.tasks.slice(0, 3).map((task) => (
                                                            <li key={task.slug} className="flex items-start gap-3">
                                                                <div className="bg-secondary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                                                                <span className="text-foreground font-medium">
                                                                    {task.title}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : null}

                                            {/* Technologies tags */}
                                            <div className="mb-6 flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 4).map((tech) => (
                                                    <span
                                                        key={tech.slug}
                                                        className="border-border bg-background text-muted rounded-full border px-3 py-1 text-xs font-medium"
                                                    >
                                                        {tech.name}
                                                    </span>
                                                ))}
                                            </div>

                                            <Link href={`/projets/${project.slug}`}>
                                                <Button
                                                    variant="outline-primary"
                                                    className="group hover:bg-primary bg-transparent hover:text-white"
                                                >
                                                    Voir le cas client
                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                            </Link>
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
            <section className="bg-primary py-16 text-white lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-3xl font-bold text-balance lg:text-5xl">
                            Prêt à lancer votre projet ?
                        </h2>
                        <p className="mb-8 text-lg leading-relaxed text-white/90 lg:text-xl">
                            Discutons de vos objectifs et découvrez comment nous pouvons vous accompagner dans votre
                            transformation digitale.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link href="/#contact">
                                <Button
                                    size="lg"
                                    className="bg-secondary text-secondary-foreground hover:bg-secondary-dark font-semibold"
                                >
                                    Démarrer un projet
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/#services">
                                <Button
                                    size="lg"
                                    variant="outline-primary"
                                    className="hover:text-primary border-white bg-transparent font-semibold text-white hover:bg-white"
                                >
                                    Découvrir nos services
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

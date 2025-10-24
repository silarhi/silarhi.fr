'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Button from '@/components/button'
import ProjectCard from '@/components/project-card'
import { cn } from '@/utils/lib'
import { ProjectProject } from '@/utils/project'

interface Technology {
    slug: string
    name: string
    projectCount: number
}

interface Category {
    slug: string
    name: string
    projectCount: number
}

interface Industry {
    slug: string
    name: string
    projectCount: number
}

interface TechnologiesPageData {
    technologies: Technology[]
    categories: Category[]
    industries: Industry[]
    projects: ProjectProject[]
}

export default function TechnologiesPage() {
    const [data, setData] = useState<TechnologiesPageData | null>(null)
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
    const [activeSection, setActiveSection] = useState<'technologies' | 'categories' | 'industries'>('technologies')
    const [isLoading, setIsLoading] = useState(true)

    // Fetch data on mount
    useEffect(() => {
        fetch('/api/technologies')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
    }, [])

    if (isLoading || !data) {
        return (
            <main className="bg-background min-h-screen">
                <section className="from-primary/5 to-background bg-gradient-to-b pt-32 pb-16 lg:pt-40 lg:pb-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center">
                            <h1 className="text-foreground mb-6 text-4xl font-bold text-balance lg:text-6xl">
                                Chargement...
                            </h1>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    const currentFilters =
        activeSection === 'technologies'
            ? data.technologies
            : activeSection === 'categories'
              ? data.categories
              : data.industries

    const filteredProjects = selectedFilter
        ? data.projects.filter((project) => {
              if (activeSection === 'technologies') {
                  return project.technologies.some((tech) => tech.slug === selectedFilter)
              }
              if (activeSection === 'categories') {
                  return project.category?.toLowerCase().replace(/\s+/g, '-') === selectedFilter
              }
              // industries
              const industry = project.industry || project.client?.sector
              return industry?.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === selectedFilter
          })
        : data.projects

    return (
        <main className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="from-primary/5 to-background bg-gradient-to-b pt-32 pb-16 lg:pt-40 lg:pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-foreground mb-6 text-4xl font-bold text-balance lg:text-6xl">
                            Explorer par <span className="text-primary">expertise</span>
                        </h1>
                        <p className="text-muted text-xl leading-relaxed lg:text-2xl">
                            Découvrez nos projets classés par technologies, catégories et secteurs d&apos;activité.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Sections */}
            <section className="border-border border-b py-16 lg:py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Section Tabs */}
                    <div className="mb-12 flex flex-wrap justify-center gap-4">
                        <Button
                            variant={activeSection === 'technologies' ? 'primary' : 'outline-dark'}
                            onClick={() => {
                                setActiveSection('technologies')
                                setSelectedFilter(null)
                            }}
                        >
                            Technologies
                        </Button>
                        <Button
                            variant={activeSection === 'categories' ? 'primary' : 'outline-dark'}
                            onClick={() => {
                                setActiveSection('categories')
                                setSelectedFilter(null)
                            }}
                        >
                            Catégories
                        </Button>
                        <Button
                            variant={activeSection === 'industries' ? 'primary' : 'outline-dark'}
                            onClick={() => {
                                setActiveSection('industries')
                                setSelectedFilter(null)
                            }}
                        >
                            Secteurs
                        </Button>
                    </div>

                    {/* Filters Display */}
                    <div className="mx-auto max-w-5xl">
                        <div className="flex flex-wrap justify-center gap-3">
                            {currentFilters.map((filter) => (
                                <button
                                    key={filter.slug}
                                    onClick={() =>
                                        setSelectedFilter(selectedFilter === filter.slug ? null : filter.slug)
                                    }
                                    className={cn(
                                        'rounded-full px-5 py-2.5 text-sm font-medium transition-all',
                                        selectedFilter === filter.slug
                                            ? 'bg-primary scale-105 text-white shadow-md'
                                            : 'border-border bg-surface text-foreground hover:border-primary/50 border hover:shadow-sm'
                                    )}
                                >
                                    {filter.name}
                                    <span className="ml-2 text-xs opacity-70">({filter.projectCount})</span>
                                </button>
                            ))}
                        </div>

                        {selectedFilter && (
                            <div className="mt-8 text-center">
                                <Button variant="outline-dark" onClick={() => setSelectedFilter(null)} size="sm">
                                    Réinitialiser le filtre
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Filtered Projects */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="mb-12">
                        <h2 className="text-foreground text-center text-2xl font-bold lg:text-3xl">
                            {selectedFilter
                                ? `Projets utilisant "${currentFilters.find((f) => f.slug === selectedFilter)?.name}"`
                                : 'Tous nos projets'}
                            <span className="text-muted ml-2">({filteredProjects.length})</span>
                        </h2>
                    </div>

                    {filteredProjects.length === 0 ? (
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
                            <p className="text-muted">Aucun projet ne correspond à votre sélection.</p>
                        </div>
                    ) : (
                        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.slug} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-muted/30 py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-foreground mb-6 text-3xl font-bold text-balance lg:text-5xl">
                            Besoin d&apos;une expertise spécifique ?
                        </h2>
                        <p className="text-muted mb-8 text-lg leading-relaxed lg:text-xl">
                            Discutons de votre projet et de vos besoins technologiques.
                        </p>
                        <Link href="/contact">
                            <Button size="lg">
                                Contactez-nous
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Button from '@/components/button'
import ProjectList from '@/components/project-list'
import { getProjectsByTechnology } from '@/utils/project'
import { getAllTechnologySlugs, getTechnologyBySlug } from '@/utils/technology'

interface TechnologyPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const slugs = getAllTechnologySlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: TechnologyPageProps): Promise<Metadata> {
    const { slug } = await params
    const technology = await getTechnologyBySlug(slug)

    if (!technology) {
        return {
            title: 'Technologie non trouvée - SILARHI',
        }
    }

    return {
        title: `Projets Web ${technology.name} - SILARHI`,
        description: `Découvrez tous nos projets réalisés avec ${technology.name}.`,
    }
}

export default async function TechnologyPage({ params }: TechnologyPageProps) {
    const { slug } = await params
    const technology = await getTechnologyBySlug(slug)
    const projects = await getProjectsByTechnology(slug)

    if (!technology || projects.length === 0) {
        notFound()
    }

    return (
        <main className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="from-primary/5 to-background bg-gradient-to-b pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                            {technology.name}
                        </div>
                        <h1 className="text-foreground mb-6 text-4xl font-bold text-balance lg:text-6xl">
                            Projets {technology.name}
                        </h1>
                        <p className="text-muted text-lg leading-relaxed lg:text-xl">
                            Découvrez tous nos projets réalisés avec {technology.name}
                        </p>
                        <p className="text-muted mt-4 text-sm">
                            <span className="font-semibold">{projects.length}</span>{' '}
                            {projects.length === 1 ? 'projet réalisé' : 'projets réalisés'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects List */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <ProjectList projects={projects} />

                    {/* Navigation links */}
                    <div className="mt-16">
                        <h3 className="text-foreground mb-6 text-xl font-semibold">Explorer</h3>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/projets">
                                <Button variant="outline-primary" size="sm">
                                    Tous les projets
                                </Button>
                            </Link>
                            <Link href="/technologies">
                                <Button variant="outline-primary" size="sm">
                                    Toutes les technologies
                                </Button>
                            </Link>
                        </div>
                    </div>
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

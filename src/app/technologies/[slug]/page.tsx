import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Button from '@/components/button'
import ProjectList from '@/components/project-list'
import ProjectsCTA from '@/components/projects-cta'
import ProjectsHero from '@/components/projects-hero'
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
            <ProjectsHero
                badge={
                    <div className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                        {technology.name}
                    </div>
                }
                title={`Projets ${technology.name}`}
                description={`Découvrez tous nos projets réalisés avec ${technology.name}`}
            >
                <p className="text-muted mt-4 text-sm">
                    <span className="font-semibold">{projects.length}</span>{' '}
                    {projects.length === 1 ? 'projet réalisé' : 'projets réalisés'}
                </p>
            </ProjectsHero>

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

            <ProjectsCTA />
        </main>
    )
}

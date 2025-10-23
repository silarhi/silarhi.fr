import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Button from '@/components/button'
import ProjectList from '@/components/project-list'
import { getAllProjectTags, getProjectsByTag } from '@/utils/project'
import { getTagBySlug } from '@/utils/tags'

interface TagPageProps {
    params: Promise<{
        tag: string
    }>
}

export async function generateStaticParams() {
    const tags = await getAllProjectTags()
    return tags.map((tag) => ({
        tag: tag.slug,
    }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { tag: tagParam } = await params
    const tag = await getTagBySlug(decodeURIComponent(tagParam))

    return {
        title: `Projets Web ${tag.name} - SILARHI`,
        description: `Découvrez tous nos projets Web sur le thème "${tag.name}".`,
    }
}

export default async function TagPage({ params }: TagPageProps) {
    const { tag: tagParam } = await params
    const tag = await getTagBySlug(decodeURIComponent(tagParam))
    const projects = await getProjectsByTag(tag.slug)
    const allTags = await getAllProjectTags()

    if (projects.length === 0) {
        notFound()
    }

    return (
        <main className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="from-primary/5 to-background bg-gradient-to-b pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl">
                        <div
                            className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium"
                            style={{
                                backgroundColor: tag.color ? `${tag.color}15` : 'rgba(var(--secondary-rgb), 0.1)',
                                color: tag.color || 'var(--secondary-dark)',
                            }}
                        >
                            {tag.name}
                        </div>
                        <h1 className="text-foreground mb-6 text-4xl font-bold text-balance lg:text-6xl">
                            Projets {tag.name}
                        </h1>
                        {tag.description && (
                            <p className="text-muted text-lg leading-relaxed lg:text-xl">{tag.description}</p>
                        )}
                        <p className="text-muted mt-4 text-sm">
                            <span className="font-semibold">{projects.length}</span>{' '}
                            {projects.length === 1 ? 'projet trouvé' : 'projets trouvés'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects List */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <ProjectList projects={projects} />

                    {/* Other tags */}
                    <div className="mt-16">
                        <h3 className="text-foreground mb-6 text-xl font-semibold">Nos autres thèmes de projet</h3>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/projets">
                                <Button variant="outline-primary" size="sm">
                                    Tous les projets
                                </Button>
                            </Link>
                            {allTags
                                .filter((t) => t.slug !== tag.slug)
                                .map((otherTag) => (
                                    <Link key={otherTag.slug} href={`/projets/tag/${otherTag.slug}`}>
                                        <Button size="sm" variant="outline-primary">
                                            {otherTag.name}
                                        </Button>
                                    </Link>
                                ))}
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

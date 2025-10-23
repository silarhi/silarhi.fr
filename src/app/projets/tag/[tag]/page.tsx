import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Button from '@/components/button'
import ProjectList from '@/components/project-list'
import ProjectsCTA from '@/components/projects-cta'
import ProjectsHero from '@/components/projects-hero'
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
            <ProjectsHero
                badge={
                    <div
                        className="inline-block rounded-full px-4 py-1.5 text-sm font-medium"
                        style={{
                            backgroundColor: tag.color ? `${tag.color}15` : 'rgba(var(--secondary-rgb), 0.1)',
                            color: tag.color || 'var(--secondary-dark)',
                        }}
                    >
                        {tag.name}
                    </div>
                }
                title={`Projets ${tag.name}`}
                description={tag.description}
            >
                <p className="text-muted mt-4 text-sm">
                    <span className="font-semibold">{projects.length}</span>{' '}
                    {projects.length === 1 ? 'projet trouvé' : 'projets trouvés'}
                </p>
            </ProjectsHero>

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

            <ProjectsCTA />
        </main>
    )
}

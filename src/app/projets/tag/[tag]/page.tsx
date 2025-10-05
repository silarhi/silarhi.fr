import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Button from '@/components/button'
import HeroTitle from '@/components/hero-title'
import ProjectGrid from '@/components/project-grid'
import Section from '@/components/section'
import SectionHeader from '@/components/section-header'
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
        <>
            <HeroTitle title={`Projet ${tag.name}`} subtitle={`Tous nos projets sur le thème ${tag.name}`} />

            <Section>
                {tag.description && (
                    <div className="mb-5 flex justify-center">
                        <div className="w-full lg:w-2/3">
                            <div
                                className="border-border rounded border bg-blue-50 px-4 py-3"
                                style={{ backgroundColor: tag.color ? `${tag.color}15` : undefined }}
                            >
                                <p className="mb-0 text-center">{tag.description}</p>
                            </div>
                        </div>
                    </div>
                )}
                <SectionHeader
                    title={`${projects.length} projet${projects.length > 1 ? 's' : ''} trouvé${projects.length > 1 ? 's' : ''}`}
                />

                <ProjectGrid projects={projects} />

                <div className="mt-4">
                    <h3 className="mb-3 text-sm font-medium">Nos autres thèmes de projet</h3>
                    <div className="flex flex-wrap gap-2">
                        <Button as="a" href="/projets" variant="outline-dark" size="sm">
                            Tous les projets
                        </Button>
                        {allTags
                            .filter((t) => t.slug !== tag.slug)
                            .map((otherTag) => (
                                <Button
                                    as="a"
                                    key={otherTag.slug}
                                    href={`/projets/tag/${otherTag.slug}`}
                                    size="sm"
                                    variant="outline-primary"
                                >
                                    {otherTag.name}
                                </Button>
                            ))}
                    </div>
                </div>
            </Section>
        </>
    )
}

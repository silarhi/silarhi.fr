import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import HeroTitle from '@/components/HeroTitle'
import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
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
                    <div className="flex justify-center mb-5">
                        <div className="w-full lg:w-2/3">
                            <div
                                className="bg-blue-50 border-0 px-4 py-3 rounded"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div key={project.slug}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <h3 className="text-sm font-medium mb-3">Nos autres thèmes de projet</h3>
                    <div className="flex flex-wrap gap-2">
                        <Link href="/projets" className="px-4 py-2 border border-gray-400 text-gray-600 rounded text-sm hover:bg-gray-100 transition-colors">
                            Tous les projets
                        </Link>
                        {allTags
                            .filter((t) => t.slug !== tag.slug)
                            .map((otherTag) => (
                                <Link
                                    key={otherTag.slug}
                                    href={`/projets/tag/${otherTag.slug}`}
                                    className="px-4 py-2 border border-primary text-primary rounded text-sm hover:bg-primary hover:text-white transition-colors"
                                >
                                    {otherTag.name}
                                </Link>
                            ))}
                    </div>
                </div>
            </Section>
        </>
    )
}

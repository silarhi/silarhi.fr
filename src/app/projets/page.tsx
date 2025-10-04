import { Metadata } from 'next'
import Link from 'next/link'

import HeroTitle from '@/components/HeroTitle'
import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import { getAllProjects, getAllProjectTags } from '@/utils/project'

export const metadata: Metadata = {
    title: 'Projets récents - SILARHI',
    description: 'Découvrez nos projets sur le développement web, PHP, Symfony et bien plus encore.',
}

export default async function ProjectPage() {
    const projects = await getAllProjects()
    const tags = await getAllProjectTags()

    return (
        <>
            <HeroTitle title="Projets récents" subtitle="Découvrez nos derniers projets sur le développement web" />

            <Section>
                {tags.length > 0 && (
                    <div className="mb-5">
                        <h3 className="text-lg mb-3">Tous les thèmes</h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Link
                                    key={tag.slug}
                                    href={`/projets/tag/${tag.slug}`}
                                    className="px-4 py-2 border border-primary text-primary rounded text-sm hover:bg-primary hover:text-white transition-colors"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {projects.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-gray-600">Aucun projet publié pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <div key={project.slug}>
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                )}
            </Section>
        </>
    )
}

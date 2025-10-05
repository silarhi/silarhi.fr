import { Metadata } from 'next'

import Button from '@/components/button'
import HeroTitle from '@/components/hero-title'
import ProjectCard from '@/components/project-card'
import Section from '@/components/section'
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
                        <h3 className="mb-3 text-lg">Tous les thèmes</h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Button
                                    as="a"
                                    key={tag.slug}
                                    href={`/projets/tag/${tag.slug}`}
                                    variant="outline-primary"
                                >
                                    {tag.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {projects.length === 0 ? (
                    <div className="py-5 text-center">
                        <p className="text-muted">Aucun projet publié pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

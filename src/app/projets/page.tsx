import { Metadata } from 'next'

import HeroTitle from '@/components/hero-title'
import ProjectGrid from '@/components/project-grid'
import Section from '@/components/section'
import TagButtonList from '@/components/tag-button-list'
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
                        <TagButtonList tags={tags} />
                    </div>
                )}

                {projects.length === 0 ? (
                    <div className="py-5 text-center">
                        <p className="text-muted">Aucun projet publié pour le moment.</p>
                    </div>
                ) : (
                    <ProjectGrid projects={projects} />
                )}
            </Section>
        </>
    )
}

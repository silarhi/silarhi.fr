import { Metadata } from 'next'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'

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
                        <h3 className="h5 mb-3">Tous les thèmes</h3>
                        <div className="d-flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/projets/tag/${tag.toLowerCase()}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {projects.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-muted">Aucun projet publié pour le moment.</p>
                    </div>
                ) : (
                    <Row className="g-4">
                        {projects.map((project) => (
                            <Col key={project.slug} md={6} lg={4}>
                                <ProjectCard project={project} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Section>
        </>
    )
}

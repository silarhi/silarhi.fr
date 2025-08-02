import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Col, Row } from 'react-bootstrap'

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
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-8">
                            <div
                                className="alert alert-info border-0"
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

                <Row className="g-4">
                    {projects.map((project) => (
                        <Col key={project.slug} md={6} lg={4}>
                            <ProjectCard project={project} />
                        </Col>
                    ))}
                </Row>

                <div className="mt-4">
                    <h3 className="h6 mb-3">Nos autres thèmes de projet</h3>
                    <div className="d-flex flex-wrap gap-2">
                        <Link href="/projets" className="btn btn-outline-secondary btn-sm">
                            Tous les projets
                        </Link>
                        {allTags
                            .filter((t) => t.slug !== tag.slug)
                            .map((otherTag) => (
                                <Link
                                    key={otherTag.slug}
                                    href={`/projets/tag/${otherTag.slug}`}
                                    className="btn btn-outline-primary btn-sm"
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

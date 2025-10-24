import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Button from '@/components/button'
import FadeInWhenVisible from '@/components/fade-in-when-visible'
import HeroTitle from '@/components/hero-title'
import ProjectGrid from '@/components/project-grid'
import Section from '@/components/section'
import SectionHeader from '@/components/section-header'
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
        <>
            <HeroTitle
                title={`Projets ${technology.name}`}
                subtitle={`Tous nos projets réalisés avec ${technology.name}`}
            />

            <Section>
                <SectionHeader
                    title={`${projects.length} projet${projects.length > 1 ? 's' : ''} réalisé${projects.length > 1 ? 's' : ''}`}
                />

                <ProjectGrid projects={projects} />

                <FadeInWhenVisible delay={0.2}>
                    <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                            <Button as="a" href="/projets" variant="outline-dark" size="sm">
                                Tous les projets
                            </Button>
                            <Button as="a" href="/technologies" variant="outline-primary" size="sm">
                                Toutes les technologies
                            </Button>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </Section>
        </>
    )
}

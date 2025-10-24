import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Button from '@/components/button'
import FadeInWhenVisible from '@/components/fade-in-when-visible'
import HeroTitle from '@/components/hero-title'
import ProjectGrid from '@/components/project-grid'
import Section from '@/components/section'
import SectionHeader from '@/components/section-header'
import { getAllClientSlugs, getClientBySlug } from '@/utils/client'
import { getProjectsByClient } from '@/utils/project'

interface ClientPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const slugs = getAllClientSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: ClientPageProps): Promise<Metadata> {
    const { slug } = await params
    const client = await getClientBySlug(slug)

    if (!client) {
        return {
            title: 'Client non trouvé - SILARHI',
        }
    }

    return {
        title: `Projets Web ${client.name} - SILARHI`,
        description: `Découvrez tous nos projets réalisés pour ${client.name}.`,
    }
}

export default async function ClientPage({ params }: ClientPageProps) {
    const { slug } = await params
    const client = await getClientBySlug(slug)
    const projects = await getProjectsByClient(slug)

    if (!client || projects.length === 0) {
        notFound()
    }

    return (
        <>
            <HeroTitle title={`Projets ${client.name}`} subtitle={`Tous nos projets réalisés pour ${client.name}`} />

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
                            <Button as="a" href="/clients" variant="outline-primary" size="sm">
                                Tous les clients
                            </Button>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </Section>
        </>
    )
}

import { Metadata } from 'next'

import Button from '@/components/button'
import FadeInWhenVisible from '@/components/fade-in-when-visible'
import HeroTitle from '@/components/hero-title'
import Section from '@/components/section'
import SectionHeader from '@/components/section-header'
import { getProjectsByTechnology } from '@/utils/project'
import { getAllTechnologies } from '@/utils/technology'

export const metadata: Metadata = {
    title: 'Nos Technologies - SILARHI',
    description: 'Découvrez les technologies que nous maîtrisons pour vos projets web.',
}

export default async function TechnologiesPage() {
    const technologies = await getAllTechnologies()

    // Get project counts for each technology
    const technologiesWithProjects = await Promise.all(
        technologies.map(async (technology) => {
            const projects = await getProjectsByTechnology(technology.slug)
            return {
                ...technology,
                projectCount: projects.length,
            }
        })
    )

    // Filter technologies with at least one project
    const activeTechnologies = technologiesWithProjects.filter((tech) => tech.projectCount > 0)

    return (
        <>
            <HeroTitle
                title="Nos Technologies"
                subtitle="Découvrez les technologies que nous maîtrisons pour vos projets web"
            />

            <Section>
                <SectionHeader
                    title={`${activeTechnologies.length} technologie${activeTechnologies.length > 1 ? 's' : ''}`}
                    subtitle="Nous utilisons des technologies modernes et éprouvées pour garantir la qualité de nos solutions"
                />

                <FadeInWhenVisible>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {activeTechnologies.map((technology) => (
                            <div
                                key={technology.slug}
                                className="border-border flex flex-col rounded-lg border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <h3 className="mb-2 text-xl font-semibold">{technology.name}</h3>
                                <p className="text-muted mb-3 text-sm">
                                    {technology.projectCount} projet{technology.projectCount > 1 ? 's' : ''}
                                </p>
                                <div className="mt-auto">
                                    <Button
                                        as="a"
                                        href={`/technologies/${technology.slug}`}
                                        variant="outline-primary"
                                        size="sm"
                                    >
                                        Voir les projets
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.2}>
                    <div className="mt-5 text-center">
                        <Button as="a" href="/projets" variant="outline-dark">
                            Voir tous les projets
                        </Button>
                    </div>
                </FadeInWhenVisible>
            </Section>
        </>
    )
}

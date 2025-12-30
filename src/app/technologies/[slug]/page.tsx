import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import HeroSection from '@/components/hero-section'
import Markdown from '@/components/markdown'
import ProjectList from '@/components/project-list'
import ProjectsCTA from '@/components/projects-cta'
import { ArrowLeft, ArrowRight } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import SectionHeader from '@/components/ui/section-header'
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
        title: `${technology.meta_title} | SILARHI`,
        description: technology.meta_description,
    }
}

export default async function TechnologyPage({ params }: TechnologyPageProps) {
    const { slug } = await params
    const technology = await getTechnologyBySlug(slug)
    const allProjects = await getProjectsByTechnology(slug)

    if (!technology || allProjects.length === 0) {
        notFound()
    }

    const MAX_PROJECTS_DISPLAY = 3
    const totalProjects = allProjects.length
    const projects = allProjects.slice(0, MAX_PROJECTS_DISPLAY)

    return (
        <>
            <HeroSection
                pretitle={
                    <Link
                        href="/projets"
                        className="group text-foreground/80 hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Retour aux projets
                    </Link>
                }
                title={technology.title}
                description={technology.description}
                className="border-0"
            />

            {/* Overview Section */}
            {technology.meta_description && (
                <Section className="border-border bg-surface border-b pt-0 lg:pt-0">
                    <div className="max-w-3xl">
                        <h2 className="text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
                            Vue d&apos;ensemble
                        </h2>
                        <div className="text-foreground text-xl leading-relaxed lg:text-2xl">
                            <Markdown
                                source={technology.meta_description}
                                variant="inline"
                                autoLinkTechnologies={false}
                            />
                        </div>
                        {technology.url && (
                            <div className="mt-6">
                                <Link
                                    href={technology.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-dark group inline-flex items-center gap-2 font-medium transition-colors"
                                >
                                    Visiter le site officiel
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )}
                    </div>
                </Section>
            )}

            {/* Why Choose Section */}
            {technology.reasons.length > 0 && (
                <Section className="bg-light border-border border-b">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="text-foreground mb-8 text-center text-3xl font-bold lg:text-4xl">
                            Pourquoi choisir {technology.name} ?
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {technology.reasons.map((reason, idx) => (
                                <div key={idx} className="border-border bg-surface rounded-xl border p-6">
                                    <h3 className="text-foreground mb-3 text-lg font-semibold">{reason.title}</h3>
                                    <p className="text-foreground/80">{reason.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            <Section className="bg-surface">
                <SectionHeader
                    title={
                        totalProjects > 1
                            ? `Nos ${Math.min(totalProjects, MAX_PROJECTS_DISPLAY)} derniers projets ${technology.name}`
                            : `Notre dernier projet ${technology.name}`
                    }
                />

                <ProjectList projects={projects} />

                {totalProjects > MAX_PROJECTS_DISPLAY && (
                    <div className="mt-12 text-center">
                        <Link
                            href={`/projets?technology=${slug}`}
                            className="text-primary hover:text-primary-dark group inline-flex items-center gap-2 text-lg font-medium transition-colors"
                        >
                            Voir les {totalProjects} projets avec {technology.name}
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                )}
            </Section>

            <ProjectsCTA
                title={`Un projet avec ${technology.name} ?`}
                description="Discutons de vos besoins et voyons comment nous pouvons vous accompagner."
            />
        </>
    )
}

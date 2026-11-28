import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import HeroSection from '@/components/hero-section'
import JsonLd from '@/components/json-ld'
import Markdown from '@/components/markdown'
import OpenSourcePackages from '@/components/open-source-packages'
import ProjectList from '@/components/project-list'
import ProjectsCTA from '@/components/projects-cta'
import ServiceCard from '@/components/service-card'
import CardGrid from '@/components/ui/card-grid'
import FadeInWhenVisible from '@/components/ui/fade-in-when-visible'
import { ArrowLeft, ArrowRight, Check } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import SectionHeader from '@/components/ui/section-header'
import { generateTechnologyPageSchema, generateTechnologyProjectsListSchema } from '@/lib/schemas/technology'
import { getPackagesByTechnology } from '@/utils/open-source'
import { getProjectFilterData, getProjectsByTechnology } from '@/utils/project'
import { getServicesByTechnology } from '@/utils/service'
import { getTechnologyBySlug } from '@/utils/technology'
import { getCanonicalUrl } from '@/utils/url'

interface TechnologyPageProps {
    params: Promise<{
        slug: string
    }>
}

// Unknown slugs get the static 404 page instead of a server render
export const dynamicParams = false

// A technology without published project has no page
export async function generateStaticParams() {
    const { technologies } = await getProjectFilterData()
    return technologies.map(({ slug }) => ({
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
        alternates: {
            canonical: getCanonicalUrl(`/technologies/${slug}`),
        },
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
    const packages = getPackagesByTechnology(slug)
    const services = await getServicesByTechnology(slug)

    // Generate technology page schemas
    const technologySchemas = [
        generateTechnologyPageSchema(technology, allProjects),
        generateTechnologyProjectsListSchema(technology, allProjects),
    ]

    return (
        <>
            <JsonLd data={technologySchemas} />
            <HeroSection
                pretitle={
                    <Link
                        href="/technologies"
                        className="group text-foreground/80 hover:text-primary inline-flex min-h-6 items-center gap-2 text-sm transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Toutes les technologies
                    </Link>
                }
                title={technology.title}
                description={technology.description}
                className="border-0"
            />

            {/* Overview Section */}
            {technology.long_description && (
                <Section className="border-border bg-surface border-b pt-0 lg:pt-0">
                    <div className="max-w-3xl">
                        <p className="text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
                            Vue d&apos;ensemble
                        </p>
                        <div className="text-foreground text-xl leading-relaxed lg:text-2xl">
                            <Markdown
                                source={technology.long_description}
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
                    <SectionHeader
                        eyebrow="Points forts"
                        title={
                            <span>
                                Pourquoi choisir <span className="text-primary">{technology.name}</span> ?
                            </span>
                        }
                    />
                    <CardGrid columns={2} className="mx-auto max-w-4xl">
                        {technology.reasons.map((reason, index) => (
                            <FadeInWhenVisible key={reason.title} delay={(index % 2) * 0.1} className="flex">
                                <div className="bg-surface dark:bg-surface-elevated border-border flex w-full gap-4 rounded-2xl border p-6 shadow-sm">
                                    <span className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full">
                                        <Check aria-hidden="true" className="size-4" />
                                    </span>
                                    <div>
                                        <h3 className="text-foreground mb-2 text-lg font-semibold">{reason.title}</h3>
                                        <p className="text-foreground/80 mb-0">{reason.description}</p>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </CardGrid>
                </Section>
            )}

            {/* Service pages built on this technology: the commercial offer behind the technical page */}
            {services.length > 0 && (
                <Section className="bg-surface border-border border-b">
                    <SectionHeader
                        eyebrow="Nos services"
                        title={
                            <span>
                                Nos services liés à <span className="text-primary">{technology.name}</span>
                            </span>
                        }
                    />
                    <CardGrid columns={2} className="mx-auto max-w-4xl">
                        {services.map((service, index) => (
                            <FadeInWhenVisible key={service.slug} delay={(index % 2) * 0.1} className="flex">
                                <ServiceCard service={service} />
                            </FadeInWhenVisible>
                        ))}
                    </CardGrid>
                </Section>
            )}

            <Section className="bg-surface">
                <SectionHeader
                    eyebrow="Nos réalisations"
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

            {packages.length > 0 && (
                <Section className="bg-light border-border border-t">
                    <SectionHeader eyebrow="Open source" title={`Nos packages open source ${technology.name}`} />
                    <OpenSourcePackages packages={packages} />
                    <div className="mt-12 text-center">
                        <Link
                            href="/open-source"
                            className="text-primary hover:text-primary-dark group inline-flex items-center gap-2 text-lg font-medium transition-colors"
                        >
                            Tous nos packages open source
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </Section>
            )}

            <ProjectsCTA
                title={`Un projet avec ${technology.name} ?`}
                description="Discutons de vos besoins et voyons comment nous pouvons vous accompagner."
            />
        </>
    )
}

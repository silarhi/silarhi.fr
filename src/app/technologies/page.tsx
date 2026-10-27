import type { Metadata } from 'next'
import Link from 'next/link'

import HeroSection from '@/components/hero-section'
import JsonLd from '@/components/json-ld'
import ProjectsCTA from '@/components/projects-cta'
import Badge from '@/components/ui/badge'
import CardGrid from '@/components/ui/card-grid'
import { ArrowRight } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import SectionHeader from '@/components/ui/section-header'
import { generateTechnologiesIndexSchemas } from '@/lib/schemas/technology'
import { getPackagesByTechnology } from '@/utils/open-source'
import { getAllProjects, type Project } from '@/utils/project'
import { getAllTechnologies, type Technology } from '@/utils/technology'
import { getCanonicalUrl } from '@/utils/url'

export const metadata: Metadata = {
    title: 'Technologies : Symfony, PHP, React, EBICS… | SILARHI',
    description:
        'Les technologies de nos projets clients, de Symfony et PHP à EBICS et Salesforce : pour chacune, les applications que nous avons livrées et maintenues.',
    alternates: {
        canonical: getCanonicalUrl('/technologies'),
    },
}

const TOP_TECHNOLOGIES = 6

interface TechnologyEntry {
    technology: Technology
    projects: Project[]
    packageCount: number
}

// Every technology with its projects, newest first; one without project has no page, so it is left out
async function getTechnologyEntries(): Promise<TechnologyEntry[]> {
    const [technologies, projects] = await Promise.all([getAllTechnologies(), getAllProjects()])

    return technologies
        .map((technology) => ({
            technology,
            projects: projects.filter((project) => project.technologies.some((tech) => tech.slug === technology.slug)),
            packageCount: getPackagesByTechnology(technology.slug).length,
        }))
        .filter((entry) => entry.projects.length > 0)
}

const formatProjectCount = (count: number) => `${count} projet${count > 1 ? 's' : ''}`

export default async function TechnologiesPage() {
    const entries = await getTechnologyEntries()
    const top = [...entries]
        .sort((a, b) => b.projects.length - a.projects.length || a.technology.name.localeCompare(b.technology.name))
        .slice(0, TOP_TECHNOLOGIES)

    return (
        <>
            <JsonLd data={generateTechnologiesIndexSchemas(entries.map((entry) => entry.technology))} />
            <HeroSection
                pretitle={<Badge variant="secondary">{entries.length} technologies</Badge>}
                title="Nos technologies"
                description="Les langages, frameworks et services de nos projets clients. Choisissez une technologie pour voir les applications que nous avons livrées avec, et notre expertise."
            />

            <Section className="bg-light border-border border-b">
                <SectionHeader title="Les plus utilisées" subtitle="Classées par nombre de projets" />
                <CardGrid>
                    {top.map(({ technology, projects }) => (
                        <Link
                            key={technology.slug}
                            href={`/technologies/${technology.slug}`}
                            className="group border-border bg-surface hover:border-primary flex flex-col rounded-xl border p-6 transition-colors hover:no-underline"
                        >
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <h3 className="text-foreground group-hover:text-primary text-xl font-semibold">
                                    {technology.name}
                                </h3>
                                <Badge size="sm">{formatProjectCount(projects.length)}</Badge>
                            </div>
                            <p className="text-foreground/80 mb-6 line-clamp-2 grow text-sm">
                                {projects
                                    .slice(0, 3)
                                    .map((project) => project.name ?? project.title)
                                    .join(' · ')}
                            </p>
                            <span className="text-primary inline-flex items-center gap-1.5 text-sm font-medium">
                                Voir la technologie
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </CardGrid>
            </Section>

            <Section className="bg-surface">
                <SectionHeader title="Toutes les technologies" subtitle="De A à Z" />
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {entries.map(({ technology, projects, packageCount }) => (
                        <li key={technology.slug}>
                            <Link
                                href={`/technologies/${technology.slug}`}
                                className="group border-border hover:border-primary flex min-h-12 items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors hover:no-underline"
                            >
                                <span className="text-foreground group-hover:text-primary font-medium">
                                    {technology.name}
                                </span>
                                <span className="text-foreground/60 shrink-0 text-xs">
                                    {formatProjectCount(projects.length)}
                                    {packageCount > 0 && ` · ${packageCount} open source`}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Section>

            <ProjectsCTA
                title="Un projet avec l'une de ces technologies ?"
                description="Discutons de vos besoins et voyons comment nous pouvons vous accompagner."
            />
        </>
    )
}

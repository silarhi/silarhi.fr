import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Markdown from '@/components/markdown'
import ProjectsCTA from '@/components/projects-cta'
import Badge from '@/components/ui/badge'
import BadgeGroup from '@/components/ui/badge-group'
import Button from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Calendar, FileText } from '@/components/ui/icons'
import { LaptopMockup } from '@/components/ui/mockup'
import ProjectScopeBadge from '@/components/ui/project-scope-badge'
import Section from '@/components/ui/section'
import SectionTitle from '@/components/ui/section-title'
import { cn } from '@/utils/lib'
import { getAllProjects, getAllProjectSlugs, getEngagementTypeLabel, getProjectBySlug } from '@/utils/project'

interface ProjectPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const slugs = getAllProjectSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        return {}
    }

    return {
        title: `${project.title} - SILARHI`,
        description: project.excerpt,
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    // Get all projects by this client to check if we should show a link
    const allProjects = await getAllProjects()
    const clientProjects = allProjects.filter((p) => p.client.slug === project.client.slug)
    const hasMultipleProjects = clientProjects.length > 1

    return (
        <>
            {/* Hero Section */}
            <Section className="bg-surface pt-32 pb-16 lg:pt-40 lg:pb-24">
                <Link
                    href="/projets"
                    className="group text-foreground/80 hover:text-primary mb-8 inline-flex items-center gap-2 text-sm transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Retour aux projets
                </Link>

                <BadgeGroup gap="lg" className="mb-6">
                    <Badge>{project.category}</Badge>
                    <Badge>{project.client.sector}</Badge>
                    <ProjectScopeBadge scope={project.scope} />
                </BadgeGroup>
                <div
                    className={cn({
                        'grid items-center gap-12 lg:grid-cols-2': project.image,
                        'max-w-4xl': !project.image,
                    })}
                >
                    <div>
                        <SectionTitle level={1} className="mb-6 text-balance">
                            {project.name && project.name + ' - '}
                            {project.title}
                        </SectionTitle>
                        <p className="text-foreground/80 mb-8 text-xl uppercase">
                            <Markdown source={project.client.name} variant="inline" />
                        </p>
                        <div className="flex gap-8 text-sm">
                            <div>
                                <div className="text-foreground/80 mb-1">Année</div>
                                <div className="text-foreground font-semibold">{project.date.getFullYear()}</div>
                            </div>
                            {project.duration && (
                                <div>
                                    <div className="text-foreground/80 mb-1">Durée</div>
                                    <div className="text-foreground font-semibold">{project.duration}</div>
                                </div>
                            )}
                        </div>
                        {project.url && (
                            <div className="mt-6">
                                <Link
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-dark group inline-flex items-center gap-2 font-medium transition-colors"
                                >
                                    Voir le projet en ligne
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {project.image && (
                        <div className="transition-transform hover:scale-105">
                            <LaptopMockup src={project.image} alt={project.title} />
                        </div>
                    )}
                </div>
            </Section>

            {/* Overview */}
            <Section className="border-border bg-surface border-b">
                <div className="max-w-3xl">
                    <h2 className="text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
                        Vue d&apos;ensemble
                    </h2>
                    <div className="text-foreground text-xl leading-relaxed lg:text-2xl">
                        <Markdown source={project.overview} variant="inline" />
                    </div>
                </div>
            </Section>

            {/* About Client */}
            <Section className="bg-light">
                <div className="max-w-3xl">
                    <h2 className="text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
                        À propos du client
                    </h2>
                    <div className="border-border bg-surface rounded-xl border p-8">
                        <div className="mb-6 flex items-center gap-4">
                            {project.client.logo && (
                                <div className="relative h-8 w-16 flex-shrink-0">
                                    <Image
                                        src={project.client.logo}
                                        alt={`Logo ${project.client.name}`}
                                        fill
                                        sizes="64px"
                                        className="object-contain"
                                        unoptimized={project.client.logo.endsWith('.svg')}
                                    />
                                </div>
                            )}
                            <h3 className="text-foreground text-2xl font-bold uppercase">{project.client.name}</h3>
                        </div>
                        <div className="text-foreground/80 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                                <div>
                                    <span className="text-foreground font-semibold">Secteur : </span>
                                    <Markdown source={project.client.sector} variant="inline" />
                                </div>
                            </div>
                            {project.client.description && (
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                                    <div>
                                        <span className="text-foreground font-semibold">Contexte : </span>
                                        <Markdown source={project.client.description} variant="inline" />
                                    </div>
                                </div>
                            )}
                        </div>
                        {hasMultipleProjects && (
                            <div className="border-border mt-6 border-t pt-6">
                                <Link
                                    href={`/projets?client=${project.client.slug}`}
                                    className="text-primary hover:text-primary-dark group inline-flex items-center gap-2 font-medium transition-colors"
                                >
                                    Voir les {clientProjects.length} projets {project.client.name}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* Challenge */}
            <Section className="border-border bg-surface border-t">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <h2 className="text-foreground mb-6 text-3xl font-bold lg:text-4xl">Le Défi</h2>
                        <p className="text-foreground/80 text-lg leading-relaxed">
                            <Markdown source={project.challenge.description} variant="inline" />
                        </p>
                    </div>
                    <div>
                        <h3 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
                            Points Clés du Défi
                        </h3>
                        <ul className="space-y-4">
                            {project.challenge.points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="bg-primary/10 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                                        <div className="bg-primary h-2 w-2 rounded-full" />
                                    </div>
                                    <span className="text-foreground">
                                        <Markdown source={point} variant="inline" />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Solution */}
            <Section className="bg-surface">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 lg:order-1">
                        <h3 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
                            Fonctionnalités Clés
                        </h3>
                        <ul className="space-y-4">
                            {project.solution.points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="bg-primary/10 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                                        <div className="bg-primary h-2 w-2 rounded-full" />
                                    </div>
                                    <span className="text-foreground">
                                        <Markdown source={point} variant="inline" />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-foreground mb-6 text-3xl font-bold lg:text-4xl">Notre Solution</h2>
                        <p className="text-foreground/80 text-lg leading-relaxed">
                            <Markdown source={project.solution.description} variant="inline" />
                        </p>
                    </div>
                </div>
            </Section>

            {/* Timeline: Engagement & Detailed Implementation */}
            <Section className="bg-light border-border border-t">
                <div className="mx-auto max-w-4xl">
                    {/* Section Header */}
                    <div className="mb-12 text-center">
                        <Badge variant="secondary" className="mb-4">
                            Notre intervention
                        </Badge>
                        <div className="mb-6 flex items-center justify-center gap-3">
                            <h2 className="text-foreground text-3xl font-bold lg:text-4xl">
                                {getEngagementTypeLabel(project.engagement.type)}
                            </h2>
                        </div>
                        <p className="text-foreground/80 mx-auto max-w-2xl text-lg leading-relaxed">
                            <Markdown source={project.engagement.description} variant="inline" />
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Iterations Section */}
                        {project.iterations.length > 0 && (
                            <div className="border-border bg-surface rounded-xl border p-6">
                                <h3 className="text-foreground mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                                    <Calendar className="h-4 w-4" />
                                    Le projet en détails
                                </h3>
                                <div className="max-h-96 overflow-y-auto pr-4">
                                    {project.iterations.map((iteration, idx) => (
                                        <div key={iteration.slug} className="flex gap-4">
                                            {project.iterations.length > 1 && (
                                                <div className="flex flex-col items-center">
                                                    <div className="bg-primary/10 text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
                                                        {idx + 1}
                                                    </div>
                                                    {idx < project.iterations.length - 1 && (
                                                        <div className="bg-border mt-2 h-full w-0.5" />
                                                    )}
                                                </div>
                                            )}
                                            <div className={cn({ 'pb-6': idx < project.iterations.length - 1 })}>
                                                <div className="text-foreground mb-1 space-x-2 font-semibold">
                                                    <span>{iteration.title}</span>
                                                    <span className="text-foreground/80 mb-2 text-sm">
                                                        {iteration.date.toLocaleDateString('fr-FR', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                        })}
                                                    </span>
                                                </div>

                                                <div className="text-foreground/80">
                                                    <article className="prose prose-sm max-w-none">
                                                        <Markdown source={iteration.content} />
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Deliverables (for one-shot projects) */}
                        <div className="border-border bg-surface rounded-xl border p-6">
                            <h3 className="text-foreground mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                                <FileText className="h-4 w-4" />
                                Livrables
                            </h3>
                            <ul className="grid gap-4 sm:grid-cols-2">
                                {project.engagement.deliverables.map((deliverable, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="bg-primary/10 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                                            <div className="bg-primary h-2 w-2 rounded-full" />
                                        </div>
                                        <span className="text-foreground">
                                            <Markdown source={deliverable} variant="inline" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Technologies */}
            <Section className="border-border bg-surface border-t">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-foreground mb-6 text-center text-sm font-semibold tracking-wide uppercase">
                        Technologies utilisées
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {project.technologies.map((tech) => (
                            <Button
                                as="a"
                                key={tech.slug}
                                size="sm"
                                href={`/technologies/${tech.slug}`}
                                variant="outline-primary"
                                className="rounded-full"
                            >
                                {tech.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA */}
            <ProjectsCTA
                title="Un projet similaire en tête ?"
                description="Discutons de vos objectifs et découvrez comment nous pouvons créer une solution sur mesure pour votre entreprise."
                primaryButton={{
                    text: 'Démarrer un projet',
                    href: '/contact',
                    variant: 'primary',
                }}
                secondaryButton={{
                    text: "Voir d'autres projets",
                    href: '/projets',
                    variant: 'outline-primary',
                }}
            />
        </>
    )
}

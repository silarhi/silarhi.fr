import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Repeat, Users, Zap } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'

import Button from '@/components/button'
import { MDXImage } from '@/components/mdx-image'
import { getAllProjectSlugs, getProjectBySlug } from '@/utils/project'
interface ProjectProjectPageProps {
    params: Promise<{
        slug: string
    }>
}

// MDX Components with optimized images
const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="mb-4" {...props} />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="mt-5 mb-3" {...props} />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="mt-4 mb-3" {...props} />,
    blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
        <blockquote className="border-primary my-4 border-l-4 pl-3 italic" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => <code className="rounded bg-gray-100 px-1" {...props} />,
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className="text-surface my-3 overflow-auto rounded bg-gray-900 p-3" {...props} />
    ),
    a: CustomLink,
    img: MDXImage,
    Image: MDXImage,
}

function CustomLink({ href, ...props }: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    if (href.startsWith('/')) {
        return <Link href={href} {...props} />
    }

    if (href.startsWith('#')) {
        return <a {...props} />
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export async function generateStaticParams() {
    const slugs = getAllProjectSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: ProjectProjectPageProps): Promise<Metadata> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        return {
            title: 'Projet non trouvé - SILARHI',
        }
    }

    return {
        title: `${project.title} - SILARHI`,
        description: project.excerpt ?? `Projet web réalisé par SILARHI`,
    }
}

export default async function ProjectProjectPage({ params }: ProjectProjectPageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return (
        <main className="bg-surface min-h-screen">
            {/* Hero Section */}
            <section className="from-primary/5 to-surface bg-gradient-to-b pt-32 pb-16 lg:pt-40 lg:pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <Link
                        href="/projets"
                        className="text-muted hover:text-primary mb-8 inline-flex items-center text-sm transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux projets
                    </Link>

                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                {project.category && (
                                    <div className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                                        {project.category}
                                    </div>
                                )}
                                {project.projectType === 'one-shot' ? (
                                    <div className="bg-secondary/10 text-secondary-dark flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
                                        <Zap className="h-4 w-4" />
                                        Mission ponctuelle
                                    </div>
                                ) : project.projectType === 'recurring' ? (
                                    <div className="bg-primary/10 text-primary flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
                                        <Repeat className="h-4 w-4" />
                                        Partenariat continu
                                    </div>
                                ) : null}
                            </div>
                            <h1 className="text-foreground mb-6 text-4xl font-bold text-balance lg:text-6xl">
                                {project.title}
                            </h1>
                            {project.client && <p className="text-muted mb-8 text-xl">{project.client.name}</p>}
                            <div className="flex gap-8 text-sm">
                                {project.year && (
                                    <div>
                                        <div className="text-muted mb-1">Année</div>
                                        <div className="text-foreground font-semibold">{project.year}</div>
                                    </div>
                                )}
                                {project.duration && (
                                    <div>
                                        <div className="text-muted mb-1">Durée</div>
                                        <div className="text-foreground font-semibold">{project.duration}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {project.image && (
                            <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-2xl">
                                <Image src={project.image} alt={project.title} fill className="object-cover" />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Overview */}
            {project.overview && (
                <section className="border-border border-b py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-3xl">
                            <h2 className="text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
                                Vue d&apos;ensemble
                            </h2>
                            <p className="text-foreground text-xl leading-relaxed lg:text-2xl">{project.overview}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Challenge */}
            {project.challenge && project.challenge.description && (
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            <div>
                                <h2 className="text-foreground mb-6 text-3xl font-bold lg:text-4xl">Le Défi</h2>
                                <p className="text-foreground/80 text-lg leading-relaxed">
                                    {project.challenge.description}
                                </p>
                            </div>
                            {project.challenge.points && (
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
                                                <span className="text-foreground">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Solution */}
            {project.solution && project.solution.description && (
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            {project.solution.points && (
                                <div className="order-2 lg:order-1">
                                    <h3 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
                                        Fonctionnalités Clés
                                    </h3>
                                    <ul className="space-y-4">
                                        {project.solution.points.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="text-success mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-foreground">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="order-1 lg:order-2">
                                <h2 className="text-foreground mb-6 text-3xl font-bold lg:text-4xl">Notre Solution</h2>
                                <p className="text-foreground/80 text-lg leading-relaxed">
                                    {project.solution.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Timeline: Engagement & Detailed Implementation */}
            {(project.engagement || project.tasks.length > 0) && (
                <section className="bg-muted/30 py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="mx-auto max-w-4xl">
                            {/* Section Header */}
                            <div className="mb-12 text-center">
                                <div className="mb-6 flex items-center justify-center gap-3">
                                    {project.projectType === 'one-shot' ? (
                                        <Zap className="text-secondary h-6 w-6" />
                                    ) : (
                                        <Repeat className="text-primary h-6 w-6" />
                                    )}
                                    <h2 className="text-foreground text-3xl font-bold lg:text-4xl">
                                        {project.engagement?.type || 'Réalisation du Projet'}
                                    </h2>
                                </div>
                                {project.engagement?.description && (
                                    <p className="text-foreground/80 mx-auto max-w-2xl text-lg leading-relaxed">
                                        {project.engagement.description}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-6">
                                {/* Tasks Section */}
                                {project.tasks.length > 0 && (
                                    <div className="border-border bg-surface rounded-xl border p-6">
                                        <h3 className="text-foreground mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                                            <Calendar className="h-4 w-4" />
                                            Phases du projet
                                        </h3>
                                        <div className="space-y-4">
                                            {project.tasks.map((task, idx) => (
                                                <div key={task.slug} className="flex gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <div className="bg-primary/10 text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
                                                            {idx + 1}
                                                        </div>
                                                        {idx < project.tasks.length - 1 && (
                                                            <div className="bg-border mt-2 h-full w-0.5" />
                                                        )}
                                                    </div>
                                                    <div className="pb-6">
                                                        <div className="text-foreground mb-1 font-semibold">
                                                            {task.title}
                                                        </div>
                                                        <div className="text-muted mb-2 text-sm">{task.date}</div>
                                                        <div className="text-foreground/80">
                                                            <article className="prose prose-sm max-w-none">
                                                                <MDXRemote
                                                                    source={task.content}
                                                                    components={mdxComponents}
                                                                    options={{
                                                                        mdxOptions: {
                                                                            remarkPlugins: [remarkGfm],
                                                                            rehypePlugins: [
                                                                                rehypeSlug,
                                                                                rehypeAutolinkHeadings,
                                                                                rehypeUnwrapImages,
                                                                            ],
                                                                        },
                                                                    }}
                                                                />
                                                            </article>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Deliverables (for one-shot projects) */}
                                {project.projectType === 'one-shot' && project.engagement?.deliverables && (
                                    <div className="border-border bg-surface rounded-xl border p-6">
                                        <h3 className="text-foreground mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Livrables
                                        </h3>
                                        <ul className="grid gap-4 sm:grid-cols-2">
                                            {project.engagement.deliverables.map((deliverable, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <CheckCircle2 className="text-success mt-0.5 h-5 w-5 flex-shrink-0" />
                                                    <span className="text-foreground">{deliverable}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Ongoing Services (for recurring projects) */}
                                {project.engagement?.ongoing && (
                                    <div className="border-border bg-surface rounded-xl border p-6">
                                        <h3 className="text-foreground mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                                            <Users className="h-4 w-4" />
                                            Services continus
                                        </h3>
                                        <ul className="grid gap-4 sm:grid-cols-2">
                                            {project.engagement.ongoing.map((service, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <CheckCircle2 className="text-success mt-0.5 h-5 w-5 flex-shrink-0" />
                                                    <span className="text-foreground">{service}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Technologies */}
            {project.technologies.length > 0 && (
                <section className="border-border border-b py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="mx-auto max-w-3xl">
                            <h2 className="text-foreground mb-6 text-center text-sm font-semibold tracking-wide uppercase">
                                Technologies Utilisées
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
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-foreground mb-6 text-3xl font-bold text-balance lg:text-5xl">
                            Un projet similaire en tête ?
                        </h2>
                        <p className="text-muted mb-8 text-lg leading-relaxed lg:text-xl">
                            Discutons de vos objectifs et découvrez comment nous pouvons créer une solution sur mesure
                            pour votre entreprise.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                as="a"
                                href="/contact"
                                size="lg"
                                className="bg-primary text-surface hover:bg-primary-dark inline-flex items-center font-semibold"
                            >
                                Démarrer un projet
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                as="a"
                                href="/projets"
                                size="lg"
                                variant="outline-primary"
                                className="bg-surface font-semibold"
                            >
                                Voir d&apos;autres projets
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

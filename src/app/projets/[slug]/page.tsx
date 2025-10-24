import { Metadata } from 'next'
import Link, { LinkProps } from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'

import Button from '@/components/button'
import ClientInfoBox from '@/components/client-info-box'
import HeroTitle from '@/components/hero-title'
import LateralTabs, { LateralTabItem } from '@/components/lateral-tabs'
import { MDXImage } from '@/components/mdx-image'
import ProjectMetadata from '@/components/project-metadata'
import Section from '@/components/section'
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

    // Create tab items for project overview and tasks, plus metadata at the end
    const tabItems: LateralTabItem[] = [
        {
            id: 'overview',
            label: 'Présentation du projet',
            content: (
                <article className="prose max-w-none">
                    <MDXRemote
                        source={project.content}
                        components={mdxComponents}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeUnwrapImages],
                            },
                        }}
                    />
                </article>
            ),
        },
        ...project.tasks.map((task) => ({
            id: task.slug,
            label: task.title,
            content: (
                <article className="prose max-w-none">
                    <MDXRemote
                        source={task.content}
                        components={mdxComponents}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeUnwrapImages],
                            },
                        }}
                    />
                </article>
            ),
        })),
        {
            id: 'metadata',
            label: 'Informations',
            content: (
                <div className="space-y-5">
                    {/* Metadata with creative design */}
                    <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                        {/* Decorative elements */}
                        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-200/20 blur-2xl transition-transform duration-500 group-hover:scale-150" />

                        {/* Header with icon */}
                        <div className="relative mb-5 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h3 className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-xl font-bold text-transparent">
                                Métadonnées du projet
                            </h3>
                        </div>

                        <div className="relative">
                            <ProjectMetadata
                                author={project.author}
                                readingTime={project.readingTime}
                                date={project.date}
                                updateDate={project.updateDate}
                            />
                        </div>
                    </div>

                    {/* Technologies with creative design */}
                    {project.technologies.length > 0 && (
                        <div className="group relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                            {/* Decorative elements */}
                            <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-tr from-purple-200/30 to-pink-200/20 blur-2xl transition-transform duration-500 group-hover:scale-150" />

                            {/* Header with icon */}
                            <div className="relative mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <h3 className="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-xl font-bold text-transparent">
                                    Technologies utilisées
                                </h3>
                            </div>

                            <div className="relative flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <div
                                        key={tech.slug}
                                        className="animate-in fade-in zoom-in"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <Button
                                            as="a"
                                            href={`/technologies/${tech.slug}`}
                                            size="sm"
                                            variant="outline-primary"
                                        >
                                            {tech.name}
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {/* Tech count badge */}
                            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 text-xs font-medium text-purple-700">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {project.technologies.length} technologie
                                {project.technologies.length > 1 ? 's' : ''} utilisée
                                {project.technologies.length > 1 ? 's' : ''}
                            </div>
                        </div>
                    )}

                    {/* Tags with creative design */}
                    {project.tags.length > 0 && (
                        <div className="group relative overflow-hidden rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                            {/* Decorative elements */}
                            <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-gradient-to-tl from-orange-200/30 to-amber-200/20 blur-2xl transition-transform duration-500 group-hover:scale-150" />

                            {/* Header with icon */}
                            <div className="relative mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <h3 className="bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-xl font-bold text-transparent">
                                    Thématiques
                                </h3>
                            </div>

                            <div className="relative flex flex-wrap gap-2">
                                {project.tags.map((tag, index) => (
                                    <div
                                        key={tag.slug}
                                        className="animate-in fade-in zoom-in"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <Button as="a" href={`/projets/tag/${tag.slug}`} size="sm">
                                            {tag.name}
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {/* Tags count badge */}
                            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                {project.tags.length} catégorie{project.tags.length > 1 ? 's' : ''}
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
    ]

    return (
        <>
            <HeroTitle title={project.title} subtitle={project.excerpt} />

            {/* Success metrics banner (if we have tasks) */}
            {project.tasks.length > 0 && (
                <Section className="border-y border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {/* Project date */}
                            <div className="text-center">
                                <div className="from-primary mb-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br to-blue-600 shadow-lg">
                                    <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="text-primary text-2xl font-bold">
                                    {new Date(project.date).getFullYear()}
                                </div>
                                <div className="text-sm text-gray-600">Année de réalisation</div>
                            </div>

                            {/* Number of phases */}
                            <div className="text-center">
                                <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                                    <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                    </svg>
                                </div>
                                <div className="text-2xl font-bold text-purple-600">{project.tasks.length}</div>
                                <div className="text-sm text-gray-600">
                                    Phase{project.tasks.length > 1 ? 's' : ''} clé
                                    {project.tasks.length > 1 ? 's' : ''}
                                </div>
                            </div>

                            {/* Technologies count */}
                            <div className="text-center">
                                <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                                    <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="text-2xl font-bold text-cyan-600">{project.technologies.length}</div>
                                <div className="text-sm text-gray-600">
                                    Technologie{project.technologies.length > 1 ? 's' : ''}
                                </div>
                            </div>

                            {/* Reading time */}
                            <div className="text-center">
                                <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg">
                                    <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="text-2xl font-bold text-orange-600">{project.readingTime}</div>
                                <div className="text-sm text-gray-600">Minutes de lecture</div>
                            </div>
                        </div>
                    </div>
                </Section>
            )}

            <Section>
                <div className="flex justify-center">
                    <div className="w-full lg:w-5/6">
                        {/* Client info box at the top */}
                        {project.client && (
                            <div className="mb-8">
                                <ClientInfoBox client={project.client} />
                            </div>
                        )}

                        {/* Value proposition callout */}
                        <div className="from-primary mb-8 overflow-hidden rounded-3xl bg-gradient-to-br to-blue-700 p-8 text-white shadow-xl md:p-12">
                            <div className="relative">
                                {/* Decorative background pattern */}
                                <div className="pointer-events-none absolute inset-0 opacity-10">
                                    <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-white blur-3xl" />
                                    <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-300 blur-2xl" />
                                </div>

                                <div className="relative">
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm font-semibold">Projet réalisé par SILARHI</span>
                                    </div>

                                    <h2 className="mb-3 text-3xl leading-tight font-bold md:text-4xl">
                                        Une solution sur mesure pour des résultats concrets
                                    </h2>
                                    <p className="max-w-3xl text-lg leading-relaxed text-cyan-50">
                                        Découvrez comment nous avons conçu et développé cette solution pour répondre aux
                                        besoins spécifiques de notre client et atteindre ses objectifs business.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Lateral tabs for project overview and tasks */}
                        <LateralTabs items={tabItems} defaultTab="overview" />

                        {/* CTA Section */}
                        <div className="mt-12 rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 text-center shadow-lg md:p-12">
                            <div className="mx-auto max-w-2xl">
                                <div className="from-primary mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br to-blue-600 shadow-lg">
                                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>

                                <h3 className="mb-3 text-2xl font-bold text-gray-900">Un projet similaire en tête ?</h3>
                                <p className="mb-6 text-lg text-gray-600">
                                    Discutons de vos besoins et voyons comment nous pouvons vous accompagner dans la
                                    réalisation de votre projet web.
                                </p>

                                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <Button as="a" href="/contact" size="lg">
                                        Parler de votre projet
                                    </Button>
                                    <Button as="a" href="/projets" variant="outline-primary" size="lg">
                                        Voir tous les projets
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}

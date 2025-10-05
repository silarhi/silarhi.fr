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
import HeroTitle from '@/components/hero-title'
import { Calendar, Clock, User } from '@/components/icons'
import { MDXImage } from '@/components/mdx-image'
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

    return (
        <>
            <HeroTitle title={project.title} subtitle={project.excerpt} />
            <Section>
                <div className="flex justify-center">
                    <div className="w-full lg:w-5/6">
                        <div className="mb-4">
                            <div className="text-muted mb-3 flex items-center">
                                <span className="mr-3">
                                    <User className="mr-1 inline" />
                                    {project.author}
                                </span>
                                <span className="mr-3">
                                    <Clock className="mr-1 inline" />
                                    {project.readingTime}
                                </span>
                                <time dateTime={project.date}>
                                    <Calendar className="mr-1 inline" />
                                    {new Date(project.date).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                    {project.updateDate && (
                                        <span className="text-muted ml-2">
                                            (mis à jour le{' '}
                                            {new Date(project.updateDate).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                            )
                                        </span>
                                    )}
                                </time>
                            </div>

                            {project.tags.length > 0 && (
                                <div className="mb-3 flex flex-wrap gap-1">
                                    {project.tags.map((tag) => (
                                        <Button as="a" key={tag.slug} href={`/projets/tag/${tag.slug}`} size="sm">
                                            {tag.name}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>

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

                        <div className="mt-5 border-t pt-4">
                            <Button as="a" href="/projets" variant="outline-primary">
                                ← Retour aux projets
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}

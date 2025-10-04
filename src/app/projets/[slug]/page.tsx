import { Metadata } from 'next'
import Link, { LinkProps } from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'

import HeroTitle from '@/components/HeroTitle'
import { Calendar, Clock, User } from '@/components/Icons'
import { MDXImage } from '@/components/MDXImage'
import Section from '@/components/Section'
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
        <blockquote className="border-l-4 border-primary pl-3 my-4 italic" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => <code className="bg-gray-100 px-1 rounded" {...props} />,
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className="bg-gray-900 text-white p-3 rounded overflow-auto my-3" {...props} />
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
                            <div className="flex items-center text-gray-600 mb-3">
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
                                        <span className="text-gray-600 ml-2">
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
                                <div className="mb-3">
                                    {project.tags.map((tag) => (
                                        <Link
                                            key={tag.slug}
                                            href={`/projets/tag/${tag.slug}`}
                                            className="inline-block bg-primary text-white px-2 py-1 rounded mr-1 no-underline text-xs"
                                        >
                                            {tag.name}
                                        </Link>
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

                        <div className="mt-5 pt-4 border-t">
                            <Link href="/projets" className="inline-block px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors">
                                ← Retour aux projets
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import HeroSection from '@/components/hero-section'
import JsonLd from '@/components/json-ld'
import Markdown from '@/components/markdown'
import OpenSourcePackages from '@/components/open-source-packages'
import ProjectList from '@/components/project-list'
import ProjectsCTA from '@/components/projects-cta'
import Badge from '@/components/ui/badge'
import Section from '@/components/ui/section'
import SectionHeader from '@/components/ui/section-header'
import { generateServiceFaqSchema, generateServicePageSchema, generateServiceSchema } from '@/lib/schemas/service'
import { getPackagesBySlugs } from '@/utils/open-source'
import { getProjectBySlug, type Project } from '@/utils/project'
import { getAllServiceSlugs, getServiceBySlug } from '@/utils/service'
import { getCanonicalUrl } from '@/utils/url'

interface ServicePageProps {
    params: Promise<{
        slug: string
    }>
}

// Only the published services exist at this level: any other slug is a 404, never a server render
export const dynamicParams = false

export async function generateStaticParams() {
    const slugs = getAllServiceSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params
    const service = await getServiceBySlug(slug)

    if (!service) {
        return {
            title: 'Service non trouvé - SILARHI',
        }
    }

    return {
        title: `${service.meta_title} | SILARHI`,
        description: service.meta_description,
        alternates: {
            canonical: getCanonicalUrl(`/${slug}`),
        },
    }
}

// Resolve the case studies referenced by a service; a typo in the front matter must fail the build, not hide a card
async function getServiceProjects(slugs: string[]): Promise<Project[]> {
    const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(slug)))

    return projects.map((project, index) => {
        if (!project) {
            throw new Error(`Unknown project "${slugs[index]}" referenced by a service page`)
        }
        return project
    })
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params
    const service = await getServiceBySlug(slug)

    if (!service) {
        notFound()
    }

    const projects = await getServiceProjects(service.projects)
    const packages = getPackagesBySlugs(service.packages)

    // Generate service page schemas (the FAQ block is only emitted when questions are visible on the page)
    const serviceSchemas = [
        generateServicePageSchema(service),
        generateServiceSchema(service),
        ...(service.faq.length > 0 ? [generateServiceFaqSchema(service)] : []),
    ]

    return (
        <>
            <JsonLd data={serviceSchemas} />
            <HeroSection
                pretitle={<Badge variant="secondary">Service</Badge>}
                title={service.title}
                description={service.excerpt}
                className="border-0"
            />

            {/* Overview: the one-paragraph definition of the service */}
            <Section className="border-border bg-surface border-b pt-0 lg:pt-0">
                <div className="max-w-3xl">
                    <h2 className="text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
                        Vue d&apos;ensemble
                    </h2>
                    <div className="text-foreground text-xl leading-relaxed lg:text-2xl">
                        <Markdown source={service.intro} variant="inline" autoLinkTechnologies={false} />
                    </div>
                </div>
            </Section>

            {/* Editorial content authored in the MDX body */}
            <Section className="bg-surface">
                <div className="mx-auto max-w-3xl [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2:first-child]:mt-0 lg:[&_h2]:text-3xl [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:text-foreground/80 [&_p]:mb-4 [&_p]:text-lg [&_p]:leading-relaxed [&_li]:text-foreground/80 [&_li]:text-lg [&_li]:leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold [&_table]:my-6 [&_table]:block [&_table]:overflow-x-auto [&_th]:border-border [&_th]:border-b [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-semibold [&_td]:border-border [&_td]:text-foreground/80 [&_td]:border-b [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top">
                    <Markdown source={service.content} />
                </div>
            </Section>

            {projects.length > 0 && (
                <Section className="bg-light border-border border-y">
                    <SectionHeader
                        title="Nos réalisations"
                        subtitle="Des projets livrés et maintenus dans la durée pour ce type de besoin"
                    />
                    <ProjectList projects={projects} />
                </Section>
            )}

            {packages.length > 0 && (
                <Section className="bg-surface border-border border-b">
                    <SectionHeader
                        title="Nos outils open source"
                        subtitle="Les bibliothèques que nous avons écrites pour ces projets, publiées et documentées"
                    />
                    <OpenSourcePackages packages={packages} />
                </Section>
            )}

            {service.faq.length > 0 && (
                <Section className="bg-surface">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">Questions fréquentes</h2>
                        <div className="space-y-8">
                            {service.faq.map((item) => (
                                <div key={item.question}>
                                    <h3 className="text-foreground mb-2 text-lg font-semibold">{item.question}</h3>
                                    <p className="text-foreground/80 leading-relaxed">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            <ProjectsCTA title={service.cta.title} description={service.cta.description} />
        </>
    )
}

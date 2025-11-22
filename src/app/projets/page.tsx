import { Metadata } from 'next'
import { Suspense } from 'react'

import ProjectFilters from '@/components/project-filters'
import ProjectListSkeleton from '@/components/project-list-skeleton'
import ProjectsCTA from '@/components/projects-cta'
import ProjectsHero from '@/components/projects-hero'
import ProjectsListAsync from '@/components/projects-list-async'
import Badge from '@/components/ui/badge'
import Section from '@/components/ui/section'
import { getAllClients } from '@/utils/client'
import { getAllProjects } from '@/utils/project'
import { getAllTechnologies } from '@/utils/technology'

export const metadata: Metadata = {
    title: 'Projets récents - SILARHI',
    description: 'Découvrez nos projets sur le développement web, PHP, Symfony et bien plus encore.',
}

interface ProjectPageProps {
    searchParams: Promise<{
        page?: string
        search?: string
        technology?: string
        category?: string
        industry?: string
        client?: string
    }>
}

const ITEMS_PER_PAGE = 9

export default async function ProjectPage({ searchParams }: ProjectPageProps) {
    const params = await searchParams
    const searchQuery = params.search || ''
    const currentPage = Number(params.page) || 1
    const technology = params.technology || ''
    const category = params.category || ''
    const industry = params.industry || ''
    const client = params.client || ''

    // Fetch data for filters
    const [allProjects, allTechnologies, allClients] = await Promise.all([
        getAllProjects(),
        getAllTechnologies(),
        getAllClients(),
    ])

    // Calculate project counts for each technology
    const technologiesWithCounts = allTechnologies.map((tech) => ({
        slug: tech.slug,
        name: tech.name,
        projectCount: allProjects.filter((project) => project.technologies.some((t) => t.slug === tech.slug)).length,
    }))

    // Get all unique categories with counts
    const categoryMap = new Map<string, { slug: string; name: string; projectCount: number }>()

    allProjects.forEach((project) => {
        if (project.category) {
            const slug = project.category.toLowerCase().replace(/\s+/g, '-')
            if (categoryMap.has(slug)) {
                categoryMap.get(slug)!.projectCount++
            } else {
                categoryMap.set(slug, {
                    slug,
                    name: project.category,
                    projectCount: 1,
                })
            }
        }
    })

    const categories = Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name))

    // Get all unique industries/sectors with counts
    const industryMap = new Map<string, { slug: string; name: string; projectCount: number }>()

    allProjects.forEach((project) => {
        const industry = project.client.sector
        if (industry) {
            const slug = industry.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
            if (industryMap.has(slug)) {
                industryMap.get(slug)!.projectCount++
            } else {
                industryMap.set(slug, {
                    slug,
                    name: industry,
                    projectCount: 1,
                })
            }
        }
    })

    const industries = Array.from(industryMap.values()).sort((a, b) => a.name.localeCompare(b.name))

    // Get all clients with counts
    const clientsWithCounts = allClients.map((client) => ({
        slug: client.slug,
        name: client.name,
        projectCount: allProjects.filter((project) => project.client.slug === client.slug).length,
    }))

    // Filter to only include items with projects
    const technologies = technologiesWithCounts.filter((tech) => tech.projectCount > 0)
    const clients = clientsWithCounts.filter((client) => client.projectCount > 0)

    return (
        <>
            <ProjectsHero
                badge={<Badge variant="secondary">Nos Réalisations</Badge>}
                title="Des projets qui transforment les entreprises"
                description="Découvrez comment nous accompagnons nos clients dans leur transformation digitale avec des solutions sur mesure qui génèrent des résultats concrets."
            >
                {/* Filter Section */}
                <ProjectFilters
                    technologies={technologies}
                    categories={categories}
                    industries={industries}
                    clients={clients}
                />
            </ProjectsHero>

            <Section id="projects-list">
                <Suspense
                    key={`${searchQuery}-${currentPage}-${technology}-${category}-${industry}-${client}`}
                    fallback={<ProjectListSkeleton count={9} />}
                >
                    <ProjectsListAsync
                        searchQuery={searchQuery}
                        currentPage={currentPage}
                        itemsPerPage={ITEMS_PER_PAGE}
                        technology={technology}
                        category={category}
                        industry={industry}
                        client={client}
                    />
                </Suspense>
            </Section>

            <ProjectsCTA />
        </>
    )
}

import { Metadata } from 'next'
import { Suspense } from 'react'

import ProjectFilters from '@/components/project-filters'
import ProjectListSkeleton from '@/components/project-list-skeleton'
import ProjectsCTA from '@/components/projects-cta'
import ProjectsHero from '@/components/projects-hero'
import ProjectsListAsync from '@/components/projects-list-async'
import Badge from '@/components/ui/badge'
import Section from '@/components/ui/section'
import { getProjectFilterData } from '@/utils/project'
import { getProjectsCanonicalUrl } from '@/utils/url'

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

export async function generateMetadata({ searchParams }: ProjectPageProps): Promise<Metadata> {
    const params = await searchParams

    return {
        title: 'Projets récents - SILARHI',
        description: 'Découvrez nos projets sur le développement web, PHP, Symfony et bien plus encore.',
        alternates: {
            canonical: getProjectsCanonicalUrl(params),
        },
    }
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

    // Build searchParams string for pagination
    const searchParamsString = new URLSearchParams(
        Object.entries(params).filter(([, v]) => v) as [string, string][]
    ).toString()

    // Fetch pre-computed filter data (O(n) instead of O(n×m))
    const { technologies, categories, industries, clients } = await getProjectFilterData()

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
                        searchParams={searchParamsString}
                    />
                </Suspense>
            </Section>

            <ProjectsCTA />
        </>
    )
}

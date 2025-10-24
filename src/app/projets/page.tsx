import { Metadata } from 'next'
import { Suspense } from 'react'

import ProjectListSkeleton from '@/components/project-list-skeleton'
import ProjectsContent from '@/components/projects-content'
import ProjectsCTA from '@/components/projects-cta'
import ProjectsHero from '@/components/projects-hero'

export const metadata: Metadata = {
    title: 'Projets récents - SILARHI',
    description: 'Découvrez nos projets sur le développement web, PHP, Symfony et bien plus encore.',
}

interface ProjectPageProps {
    searchParams: Promise<{ page?: string; search?: string }>
}

const ITEMS_PER_PAGE = 9

export default async function ProjectPage({ searchParams }: ProjectPageProps) {
    const params = await searchParams
    const currentPage = Number(params.page) || 1
    const searchQuery = params.search || ''

    return (
        <main className="bg-background min-h-screen">
            <ProjectsHero
                badge={
                    <div className="bg-secondary/10 text-secondary-dark inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                        Nos Réalisations
                    </div>
                }
                title="Des projets qui transforment les entreprises"
                description="Découvrez comment nous accompagnons nos clients dans leur transformation digitale avec des solutions sur mesure qui génèrent des résultats concrets."
                showSearch
            />

            {/* Projects Grid with Suspense */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <Suspense key={`${currentPage}-${searchQuery}`} fallback={<ProjectListSkeleton count={ITEMS_PER_PAGE} />}>
                        <ProjectsContent
                            currentPage={currentPage}
                            searchQuery={searchQuery}
                            itemsPerPage={ITEMS_PER_PAGE}
                        />
                    </Suspense>
                </div>
            </section>

            <ProjectsCTA />
        </main>
    )
}

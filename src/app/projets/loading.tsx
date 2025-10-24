import ProjectListSkeleton from '@/components/project-list-skeleton'
import ProjectsHero from '@/components/projects-hero'

export default function Loading() {
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

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <ProjectListSkeleton count={9} />
                </div>
            </section>
        </main>
    )
}

import ProjectListSkeleton from '@/components/project-list-skeleton'
import ProjectsHero from '@/components/projects-hero'
import Skeleton from '@/components/skeleton'

export default function Loading() {
    return (
        <main className="bg-background min-h-screen">
            <ProjectsHero badge={<Skeleton className="h-7 w-24 rounded-full" />} title="Chargement des projets..." />

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <ProjectListSkeleton count={9} />
                </div>
            </section>
        </main>
    )
}

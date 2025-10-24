import ProjectCardSkeleton from '@/components/project-card-skeleton'

interface ProjectGridSkeletonProps {
    count?: number
}

export default function ProjectGridSkeleton({ count = 9 }: ProjectGridSkeletonProps) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
            ))}
        </div>
    )
}

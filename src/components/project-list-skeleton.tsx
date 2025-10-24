import Skeleton from '@/components/skeleton'

interface ProjectListSkeletonProps {
    count?: number
}

export default function ProjectListSkeleton({ count = 3 }: ProjectListSkeletonProps) {
    return (
        <div className="space-y-24">
            {Array.from({ length: count }).map((_, index) => (
                <article
                    key={index}
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                        index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                    }`}
                >
                    {/* Image skeleton */}
                    <div
                        className={`bg-muted relative aspect-[4/3] overflow-hidden rounded-2xl ${
                            index % 2 === 1 ? 'lg:col-start-2' : ''
                        }`}
                    >
                        <Skeleton className="h-full w-full" />
                    </div>

                    {/* Content skeleton */}
                    <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                        {/* Category badge */}
                        <Skeleton className="mb-4 h-6 w-24 rounded-full" />

                        {/* Title */}
                        <Skeleton className="mb-3 h-10 w-3/4" />

                        {/* Client name */}
                        <Skeleton className="mb-6 h-4 w-32" />

                        {/* Excerpt - 3 lines */}
                        <div className="mb-8 space-y-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-4/5" />
                        </div>

                        {/* Key points box */}
                        <div className="border-border bg-surface mb-8 rounded-xl border p-6">
                            <Skeleton className="mb-4 h-4 w-24" />
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        </div>

                        {/* Technology tags */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            <Skeleton className="h-7 w-16 rounded-full" />
                            <Skeleton className="h-7 w-20 rounded-full" />
                            <Skeleton className="h-7 w-18 rounded-full" />
                            <Skeleton className="h-7 w-22 rounded-full" />
                        </div>

                        {/* CTA button */}
                        <Skeleton className="h-10 w-40 rounded-md" />
                    </div>
                </article>
            ))}
        </div>
    )
}

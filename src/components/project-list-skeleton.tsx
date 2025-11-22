import Skeleton from '@/components/ui/skeleton'
import { cn } from '@/utils/lib'

interface ProjectListSkeletonProps {
    count?: number
}

export default function ProjectListSkeleton({ count = 3 }: ProjectListSkeletonProps) {
    return (
        <div className="space-y-24">
            {Array.from({ length: count }).map((_, index) => (
                <article
                    key={index}
                    className={cn('grid items-center gap-8 lg:grid-cols-2 lg:gap-16', {
                        'lg:grid-flow-dense': index % 2 === 1,
                    })}
                >
                    {/* Image skeleton */}
                    <div
                        className={cn(
                            'bg-muted/10 relative flex h-full items-center justify-center overflow-hidden rounded-2xl p-2 lg:p-4',
                            {
                                'lg:col-start-2': index % 2 === 1,
                            }
                        )}
                    >
                        <Skeleton className="h-full w-full" />

                        {/* Project scope badge on image */}
                        <div className="absolute top-4 right-4">
                            <Skeleton className="h-6 w-32 rounded-full" />
                        </div>
                    </div>

                    {/* Content skeleton */}
                    <div
                        className={cn({
                            'lg:col-start-1 lg:row-start-1': index % 2 === 1,
                        })}
                    >
                        {/* Badges (category + sector) */}
                        <div className="mb-4 flex gap-2">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>

                        {/* Title */}
                        <Skeleton className="mb-3 h-8 w-3/4" />
                        <Skeleton className="mb-3 h-8 w-3/4" />

                        {/* Client name */}
                        <Skeleton className="mb-6 h-4 w-32" />

                        {/* Excerpt */}
                        <Skeleton className="mb-2 h-5 w-full" />
                        <Skeleton className="mb-2 h-5 w-full" />
                        <Skeleton className="mb-8 h-5 w-full" />

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

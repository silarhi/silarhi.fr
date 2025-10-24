import Skeleton from '@/components/skeleton'

export default function ProjectCardSkeleton() {
    return (
        <article className="bg-surface border-border h-full overflow-hidden rounded-lg border shadow-sm">
            <div className="flex h-full flex-col p-6">
                <div className="mb-3">
                    {/* Title */}
                    <Skeleton className="mb-4 h-7 w-3/4" />

                    {/* Excerpt - 2 lines */}
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="mt-auto text-sm">
                    {/* Tags */}
                    <div className="mb-2 flex flex-wrap gap-1">
                        <Skeleton className="h-6 w-16 rounded-md" />
                        <Skeleton className="h-6 w-20 rounded-md" />
                        <Skeleton className="h-6 w-14 rounded-md" />
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
            </div>
        </article>
    )
}

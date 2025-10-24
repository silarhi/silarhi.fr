import { cn } from '@/utils/lib'

interface SkeletonProps {
    className?: string
}

export default function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'bg-muted animate-pulse rounded-md',
                className
            )}
        />
    )
}

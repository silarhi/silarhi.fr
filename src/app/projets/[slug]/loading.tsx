import { ArrowLeft } from '@/components/ui/icons'
import Section from '@/components/ui/section'

export default function Loading() {
    return (
        <>
            {/* Hero Section Skeleton */}
            <Section className="bg-surface pt-32 pb-16 lg:pt-40 lg:pb-24">
                {/* Back button skeleton */}
                <div className="mb-8 flex items-center gap-2 text-sm">
                    <ArrowLeft className="text-foreground/80 h-4 w-4" />
                    <div className="bg-muted/20 h-4 w-32 animate-pulse rounded" />
                </div>

                {/* Badges skeleton */}
                <div className="mb-6 flex items-center gap-3">
                    <div className="bg-muted/20 h-7 w-24 animate-pulse rounded-full" />
                    <div className="bg-muted/20 h-7 w-32 animate-pulse rounded-full" />
                    <div className="bg-muted/20 h-7 w-28 animate-pulse rounded-full" />
                </div>

                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        {/* Title skeleton */}
                        <div className="mb-6 space-y-3">
                            <div className="bg-muted/30 h-12 w-3/4 animate-pulse rounded lg:h-16" />
                            <div className="bg-muted/30 h-12 w-full animate-pulse rounded lg:h-16" />
                        </div>

                        {/* Client name skeleton */}
                        <div className="bg-muted/20 mb-8 h-6 w-48 animate-pulse rounded" />

                        {/* Metadata skeleton */}
                        <div className="flex gap-8">
                            <div>
                                <div className="bg-muted/20 mb-1 h-4 w-16 animate-pulse rounded" />
                                <div className="bg-muted/30 h-5 w-12 animate-pulse rounded" />
                            </div>
                            <div>
                                <div className="bg-muted/20 mb-1 h-4 w-16 animate-pulse rounded" />
                                <div className="bg-muted/30 h-5 w-16 animate-pulse rounded" />
                            </div>
                        </div>

                        {/* URL skeleton */}
                        <div className="bg-muted/20 mt-6 h-5 w-40 animate-pulse rounded" />
                    </div>

                    {/* Image skeleton */}
                    <div className="bg-muted/10 relative aspect-[4/3] animate-pulse overflow-hidden rounded-2xl" />
                </div>
            </Section>

            {/* Overview Section Skeleton */}
            <Section className="border-border bg-surface border-b">
                <div className="max-w-3xl">
                    <div className="bg-muted/20 mb-4 h-4 w-32 animate-pulse rounded" />
                    <div className="space-y-3">
                        <div className="bg-muted/20 h-6 w-full animate-pulse rounded" />
                        <div className="bg-muted/20 h-6 w-11/12 animate-pulse rounded" />
                        <div className="bg-muted/20 h-6 w-5/6 animate-pulse rounded" />
                    </div>
                </div>
            </Section>

            {/* About Client Section Skeleton */}
            <Section className="bg-light">
                <div className="max-w-3xl">
                    <div className="bg-muted/20 mb-4 h-4 w-36 animate-pulse rounded" />
                    <div className="border-border bg-surface rounded-xl border p-8">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="bg-muted/20 h-8 w-16 animate-pulse rounded" />
                            <div className="bg-muted/30 h-6 w-48 animate-pulse rounded" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-primary/20 mt-2 h-1.5 w-1.5 rounded-full" />
                                <div className="bg-muted/20 h-4 w-full animate-pulse rounded" />
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-primary/20 mt-2 h-1.5 w-1.5 rounded-full" />
                                <div className="bg-muted/20 h-4 w-5/6 animate-pulse rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Challenge Section Skeleton */}
            <Section className="border-border bg-surface border-t">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <div className="bg-muted/30 mb-6 h-10 w-48 animate-pulse rounded lg:h-12" />
                        <div className="space-y-3">
                            <div className="bg-muted/20 h-5 w-full animate-pulse rounded" />
                            <div className="bg-muted/20 h-5 w-11/12 animate-pulse rounded" />
                            <div className="bg-muted/20 h-5 w-4/5 animate-pulse rounded" />
                        </div>
                    </div>
                    <div>
                        <div className="bg-muted/20 mb-6 h-4 w-40 animate-pulse rounded" />
                        <div className="space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="bg-primary/10 mt-0.5 h-6 w-6 rounded-full" />
                                    <div className="bg-muted/20 h-4 w-full animate-pulse rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Solution Section Skeleton */}
            <Section className="bg-surface">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <div className="bg-muted/20 mb-6 h-4 w-40 animate-pulse rounded" />
                        <div className="space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="bg-primary/10 mt-0.5 h-6 w-6 rounded-full" />
                                    <div className="bg-muted/20 h-4 w-full animate-pulse rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="bg-muted/30 mb-6 h-10 w-56 animate-pulse rounded lg:h-12" />
                        <div className="space-y-3">
                            <div className="bg-muted/20 h-5 w-full animate-pulse rounded" />
                            <div className="bg-muted/20 h-5 w-5/6 animate-pulse rounded" />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Timeline/Engagement Section Skeleton */}
            <Section className="bg-light border-border border-t">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 text-center">
                        <div className="mb-6 flex items-center justify-center gap-3">
                            <div className="bg-muted/20 h-6 w-6 animate-pulse rounded-full" />
                            <div className="bg-muted/30 h-10 w-64 animate-pulse rounded" />
                        </div>
                        <div className="mx-auto max-w-2xl space-y-2">
                            <div className="bg-muted/20 mx-auto h-5 w-3/4 animate-pulse rounded" />
                            <div className="bg-muted/20 mx-auto h-5 w-2/3 animate-pulse rounded" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Iterations skeleton */}
                        <div className="border-border bg-surface rounded-xl border p-6">
                            <div className="bg-muted/20 mb-4 h-4 w-40 animate-pulse rounded" />
                            <div className="space-y-4">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="bg-primary/10 h-10 w-10 shrink-0 animate-pulse rounded-full" />
                                        <div className="flex-1 space-y-2 pb-6">
                                            <div className="bg-muted/30 h-5 w-48 animate-pulse rounded" />
                                            <div className="bg-muted/20 h-4 w-32 animate-pulse rounded" />
                                            <div className="bg-muted/20 h-4 w-full animate-pulse rounded" />
                                            <div className="bg-muted/20 h-4 w-5/6 animate-pulse rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Deliverables skeleton */}
                        <div className="border-border bg-surface rounded-xl border p-6">
                            <div className="bg-muted/20 mb-4 h-4 w-24 animate-pulse rounded" />
                            <div className="grid gap-4 sm:grid-cols-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="bg-primary/10 mt-0.5 h-6 w-6 rounded-full" />
                                        <div className="bg-muted/20 h-4 w-full animate-pulse rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Technologies Section Skeleton */}
            <Section className="border-border bg-surface border-t">
                <div className="mx-auto max-w-3xl">
                    <div className="bg-muted/20 mx-auto mb-6 h-4 w-48 animate-pulse rounded" />
                    <div className="flex flex-wrap justify-center gap-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-muted/20 h-9 w-24 animate-pulse rounded-full" />
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA Section Skeleton */}
            <Section className="border-border bg-light border-t py-16 lg:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="bg-muted/30 mx-auto mb-6 h-12 w-3/4 animate-pulse rounded lg:h-16" />
                    <div className="mx-auto mb-8 max-w-2xl space-y-2">
                        <div className="bg-muted/20 mx-auto h-6 w-5/6 animate-pulse rounded" />
                        <div className="bg-muted/20 mx-auto h-6 w-4/6 animate-pulse rounded" />
                    </div>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <div className="bg-muted/30 h-12 w-48 animate-pulse rounded-lg" />
                        <div className="bg-muted/20 h-12 w-56 animate-pulse rounded-lg" />
                    </div>
                </div>
            </Section>
        </>
    )
}

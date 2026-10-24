import type { ReactNode } from 'react'

import { cn } from '@/utils/lib'

export interface LegalSectionProps {
    /** Anchor of the section, listed in the table of contents */
    id: string
    title: string
    children: ReactNode
    className?: string
}

/**
 * A numbered card of a legal page. The number comes from a CSS counter reset by LegalLayout,
 * so that it always matches the order of the sections and of the table of contents.
 */
export default function LegalSection({ id, title, children, className }: LegalSectionProps) {
    return (
        <section
            id={id}
            aria-labelledby={`${id}-title`}
            className={cn(
                'bg-surface dark:bg-surface-elevated border-border scroll-mt-24 rounded-2xl border p-5 shadow-sm [counter-increment:legal-section] sm:p-8 print:border-0 print:p-0 print:shadow-none',
                className
            )}
        >
            <h2
                id={`${id}-title`}
                className="mb-5 flex items-start gap-3 text-xl font-bold lg:text-2xl print:mb-3 print:break-after-avoid"
            >
                <span
                    className="bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-primary-light flex size-9 shrink-0 items-center justify-center rounded-lg text-base before:content-[counter(legal-section)]"
                    aria-hidden="true"
                />
                <span className="pt-0.5 lg:pt-0">{title}</span>
            </h2>
            <div
                className={cn(
                    'text-foreground/90 leading-relaxed',
                    '[&_li]:mb-1.5 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul_ul]:mt-1.5 [&_ul_ul]:list-[circle]',
                    '[&>*:last-child]:mb-0'
                )}
            >
                {children}
            </div>
        </section>
    )
}

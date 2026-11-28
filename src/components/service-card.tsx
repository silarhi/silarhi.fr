import Link from 'next/link'

import { ArrowRight } from '@/components/ui/icons'
import type { Service } from '@/utils/service'

export interface ServiceCardProps {
    service: Service
}

// Link to a service page (home page services, technology pages)
export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Link
            href={`/${service.slug}`}
            className="bg-surface dark:bg-surface-elevated border-border hover:border-primary/40 group flex w-full flex-col rounded-2xl border p-6 text-inherit shadow-sm transition-[border-color,box-shadow] hover:no-underline hover:shadow-md"
        >
            <span className="text-primary dark:text-primary-light mb-2 text-xs font-semibold tracking-wide uppercase">
                {service.category ?? 'Service'}
            </span>
            <h3 className="text-foreground mb-3 text-xl font-bold">{service.title}</h3>
            <p className="text-foreground/80 mb-6 flex-1">{service.excerpt}</p>
            <span className="text-primary dark:text-primary-light inline-flex items-center gap-2 font-medium">
                En savoir plus
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
        </Link>
    )
}

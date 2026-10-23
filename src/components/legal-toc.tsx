'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/utils/lib'

interface LegalTocItem {
    id: string
    title: string
    number?: number
}

interface LegalTocProps {
    items: LegalTocItem[]
}

/**
 * Sticky "Sur cette page" table of contents of a legal page, highlighting the section being read (scrollspy).
 */
export default function LegalToc({ items }: LegalTocProps) {
    const [activeId, setActiveId] = useState(items[0]?.id)

    useEffect(() => {
        const visible = new Map<string, boolean>()
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    visible.set(entry.target.id, entry.isIntersecting)
                }
                // The first section crossing the reading band wins; between two cards, the last one stays active
                const firstVisible = items.find((item) => visible.get(item.id))
                if (firstVisible) {
                    setActiveId(firstVisible.id)
                }
            },
            { rootMargin: '-96px 0px -65% 0px' }
        )

        for (const item of items) {
            const element = document.getElementById(item.id)
            if (element) {
                observer.observe(element)
            }
        }

        return () => observer.disconnect()
    }, [items])

    return (
        <div className="bg-surface dark:bg-surface-elevated border-border sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col rounded-2xl border p-5 shadow-sm">
            <p className="text-foreground mb-3 px-3 font-bold">Sur cette page</p>
            <nav aria-label="Sur cette page" className="-mx-1 min-h-0 overflow-y-auto px-1">
                <ol className="space-y-1">
                    {items.map((item) => {
                        const isActive = item.id === activeId

                        return (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    aria-current={isActive ? 'location' : undefined}
                                    className={cn(
                                        'flex items-baseline gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:no-underline',
                                        {
                                            'bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-primary-light font-semibold':
                                                isActive,
                                            'text-foreground/75 hover:bg-background hover:text-foreground': !isActive,
                                        }
                                    )}
                                >
                                    {item.number && (
                                        <span className="w-5 shrink-0 text-xs tabular-nums opacity-70">
                                            {item.number}.
                                        </span>
                                    )}
                                    <span>{item.title}</span>
                                </a>
                            </li>
                        )
                    })}
                </ol>
            </nav>
        </div>
    )
}

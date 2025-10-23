import { ReactNode } from 'react'

import SearchForm from '@/components/search-form'

interface ProjectsHeroProps {
    badge?: ReactNode
    title: string
    description?: string
    children?: ReactNode
    showSearch?: boolean
}

export default function ProjectsHero({ badge, title, description, children, showSearch }: ProjectsHeroProps) {
    return (
        <section className="from-primary/5 to-background bg-gradient-to-b pt-32 pb-16 lg:pt-40 lg:pb-24">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl">
                    {badge && <div className="mb-6">{badge}</div>}

                    <h1 className="text-foreground mb-6 text-4xl font-bold text-balance lg:text-6xl">{title}</h1>

                    {description && <p className="text-muted text-lg leading-relaxed lg:text-xl">{description}</p>}

                    {showSearch && (
                        <div className="mt-8">
                            <SearchForm baseUrl="/projets" />
                        </div>
                    )}

                    {children}
                </div>
            </div>
        </section>
    )
}

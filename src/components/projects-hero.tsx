import { ReactNode } from 'react'

import HeroSection from '@/components/hero-section'
import SearchForm from '@/components/search-form'

interface ProjectsHeroProps {
    badge?: ReactNode
    title: string
    description?: string
    children?: ReactNode
}

export default function ProjectsHero({ badge, title, description, children }: ProjectsHeroProps) {
    return (
        <HeroSection title={title} description={description} pretitle={badge} className="border-0">
            <div className="max-w-3xl">
                <div className="mt-8">
                    <SearchForm baseUrl="/projets" />
                </div>

                {children}
            </div>
        </HeroSection>
    )
}

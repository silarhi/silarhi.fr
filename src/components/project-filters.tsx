'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { FilterIcon } from '@/components/ui/icons'
import { cn } from '@/utils/lib'
import { FilterType, getActiveFilter } from '@/utils/url'

interface FilterOption {
    slug: string
    name: string
    projectCount: number
}

interface ProjectFiltersProps {
    technologies: FilterOption[]
    categories: FilterOption[]
    industries: FilterOption[]
    clients: FilterOption[]
}

export default function ProjectFilters({ technologies, categories, industries, clients }: ProjectFiltersProps) {
    const searchParams = useSearchParams()
    const [expandedSection, setExpandedSection] = useState<FilterType | null>(null)

    // Get the active filter from URL (ensures only one is considered)
    const activeFilter = getActiveFilter(searchParams)
    const activeSectionFromUrl = activeFilter?.type ?? null
    const searchQuery = searchParams.get('search') || ''

    // Show filters when: expanded manually OR there's an active filter from URL
    const activeSection = expandedSection || activeSectionFromUrl

    // Toggle section expansion
    const toggleExpandedSection = (section: FilterType) => {
        setExpandedSection(activeSection === section ? null : section)
    }

    const buildFilterUrl = (filterType: FilterType, filterValue: string | null) => {
        const params = new URLSearchParams()

        // Preserve search query
        if (searchQuery) {
            params.set('search', searchQuery)
        }

        // Set the filter (only one filter at a time)
        if (filterValue) {
            params.set(filterType, filterValue)
        }

        const queryString = params.toString()
        return queryString ? `/projets?${queryString}` : '/projets'
    }

    const buildResetUrl = () => {
        if (searchQuery) {
            return `/projets?search=${encodeURIComponent(searchQuery)}`
        }
        return '/projets'
    }

    let currentFilters: FilterOption[] = []
    let activeFilterValue: string | null = null

    if (activeSection === 'technology') {
        currentFilters = technologies
        activeFilterValue = activeFilter?.type === 'technology' ? activeFilter.value : null
    } else if (activeSection === 'category') {
        currentFilters = categories
        activeFilterValue = activeFilter?.type === 'category' ? activeFilter.value : null
    } else if (activeSection === 'industry') {
        currentFilters = industries
        activeFilterValue = activeFilter?.type === 'industry' ? activeFilter.value : null
    } else if (activeSection === 'client') {
        currentFilters = clients
        activeFilterValue = activeFilter?.type === 'client' ? activeFilter.value : null
    }

    const hasActiveFilters = activeFilter !== null

    return (
        <div className="mt-8 flex flex-col gap-6">
            {/* Filter Section Buttons */}
            <div className="flex flex-wrap items-center gap-3">
                <FilterIcon className={cn('text-foreground/80 h-5 w-5', { 'text-primary': hasActiveFilters })} />
                Filter par:
                <Button
                    variant={activeSection === 'technology' ? 'primary' : 'outline-primary'}
                    onClick={() => toggleExpandedSection('technology')}
                    size="sm"
                >
                    Technologies
                </Button>
                <Button
                    variant={activeSection === 'category' ? 'primary' : 'outline-primary'}
                    onClick={() => toggleExpandedSection('category')}
                    size="sm"
                >
                    Catégories
                </Button>
                <Button
                    variant={activeSection === 'industry' ? 'primary' : 'outline-primary'}
                    onClick={() => toggleExpandedSection('industry')}
                    size="sm"
                >
                    Secteurs
                </Button>
                <Button
                    variant={activeSection === 'client' ? 'primary' : 'outline-primary'}
                    onClick={() => toggleExpandedSection('client')}
                    size="sm"
                >
                    Clients
                </Button>
                {hasActiveFilters && (
                    <Button variant="link" size="sm" as="a" href={buildResetUrl()} scroll={false}>
                        Réinitialiser
                    </Button>
                )}
            </div>

            {/* Filter Options as Badges */}
            {activeSection && (
                <div className="flex flex-wrap gap-3">
                    {currentFilters.map((filter) => (
                        <Link
                            key={filter.slug}
                            href={buildFilterUrl(activeSection, activeFilterValue === filter.slug ? null : filter.slug)}
                            scroll={false}
                        >
                            <Badge
                                variant={activeFilterValue === filter.slug ? 'primary' : 'outline-primary'}
                                className={cn({
                                    'bg-primary text-surface scale-105 shadow-md': activeFilterValue === filter.slug,
                                })}
                            >
                                {filter.name}
                                <span className="text-xs opacity-70">({filter.projectCount})</span>
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

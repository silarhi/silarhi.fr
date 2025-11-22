'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { FilterIcon } from '@/components/ui/icons'
import { cn } from '@/utils/lib'

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
    const [expandedSection, setExpandedSection] = useState<'technology' | 'category' | 'industry' | 'client' | null>(
        null
    )

    const technology = searchParams.get('technology') || null
    const category = searchParams.get('category') || null
    const industry = searchParams.get('industry') || null
    const client = searchParams.get('client') || null
    const searchQuery = searchParams.get('search') || ''

    // Determine active section from URL params (for highlighting active filter)
    const activeSectionFromUrl = technology
        ? 'technology'
        : category
          ? 'category'
          : industry
            ? 'industry'
            : client
              ? 'client'
              : null

    // Show filters when: expanded manually OR there's an active filter from URL
    const activeSection = expandedSection || activeSectionFromUrl

    // Toggle section expansion
    const toggleExpandedSection = (section: 'technology' | 'category' | 'industry' | 'client') => {
        setExpandedSection(activeSection === section ? null : section)
    }

    const buildFilterUrl = (filterType: string, filterValue: string | null) => {
        const params = new URLSearchParams()

        // Keep search query if present
        if (searchQuery) {
            params.set('search', searchQuery)
        }

        // Set the filter
        if (filterValue) {
            params.set(filterType, filterValue)
        }

        // Reset to first page
        params.set('page', '1')

        return `/projets?${params.toString()}`
    }

    let currentFilters: FilterOption[] = []
    let activeFilterValue: string | null = null

    if (activeSection === 'technology') {
        currentFilters = technologies
        activeFilterValue = technology
    } else if (activeSection === 'category') {
        currentFilters = categories
        activeFilterValue = category
    } else if (activeSection === 'industry') {
        currentFilters = industries
        activeFilterValue = industry
    } else if (activeSection === 'client') {
        currentFilters = clients
        activeFilterValue = client
    }

    const hasActiveFilters = technology || category || industry || client

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
                    <Link
                        href={searchQuery ? `/projets?search=${searchQuery}` : '/projets'}
                        className="text-foreground/80 hover:text-foreground text-sm underline transition-colors"
                    >
                        Réinitialiser
                    </Link>
                )}
            </div>

            {/* Filter Options as Badges */}
            {activeSection && (
                <div className="flex flex-wrap gap-3">
                    {currentFilters.map((filter) => (
                        <Link
                            key={filter.slug}
                            href={buildFilterUrl(activeSection, activeFilterValue === filter.slug ? null : filter.slug)}
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

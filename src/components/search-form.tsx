'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { getActiveFilter } from '@/utils/url'

import SearchInput from './search-input'

interface SearchFormProps {
    baseUrl: string
    className?: string
}

export default function SearchForm({ baseUrl, className }: SearchFormProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
    const [debouncedSearchQuery] = useDebounce(searchQuery, 300)

    // Update URL when debounced search query changes
    useEffect(() => {
        const currentSearch = searchParams.get('search') || ''

        // Only update URL if search query changed
        if (currentSearch === debouncedSearchQuery) {
            return
        }

        // Build new URL preserving only one filter param (enforce mutual exclusivity)
        const params = new URLSearchParams()

        // Set search query
        if (debouncedSearchQuery) {
            params.set('search', debouncedSearchQuery)
        }

        // Preserve only the first active filter
        const activeFilter = getActiveFilter(searchParams)
        if (activeFilter) {
            params.set(activeFilter.type, activeFilter.value)
        }

        const queryString = params.toString()
        const url = queryString ? `${baseUrl}?${queryString}` : baseUrl

        router.replace(url, { scroll: false })
    }, [debouncedSearchQuery, searchParams, baseUrl, router])

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
    }

    return (
        <div role="search" aria-label="Rechercher des projets" className={className}>
            <SearchInput name="search" value={searchQuery} onChange={handleSearchChange} />
        </div>
    )
}

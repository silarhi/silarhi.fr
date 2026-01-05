'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

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

        // Build new URL preserving existing params
        const params = new URLSearchParams(searchParams.toString())

        if (debouncedSearchQuery) {
            params.set('search', debouncedSearchQuery)
        } else {
            params.delete('search')
        }

        // Reset to first page when search changes
        params.delete('page')

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

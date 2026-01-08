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
        if (currentSearch === debouncedSearchQuery) {
            return
        }

        const params = new URLSearchParams(searchParams.toString())
        if (debouncedSearchQuery) params.set('search', debouncedSearchQuery)
        else params.delete('search')
        params.delete('page')

        const queryString = params.toString()
        router.replace(queryString ? `${baseUrl}?${queryString}` : baseUrl, { scroll: false })
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

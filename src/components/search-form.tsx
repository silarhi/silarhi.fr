'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import { useDebounce } from 'use-debounce'

import SearchInput from './search-input'

interface SearchFormProps {
    baseUrl: string
    className?: string
}

export default function SearchForm({ baseUrl, className }: SearchFormProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
    const [debouncedSearchQuery] = useDebounce(searchQuery, 300)

    useEffect(() => {
        startTransition(() => {
            const params = new URLSearchParams()
            if (debouncedSearchQuery) {
                params.set('search', debouncedSearchQuery)
            }
            // Reset to page 1 when searching
            params.set('page', '1')

            const newUrl = debouncedSearchQuery ? `${baseUrl}?${params.toString()}` : baseUrl
            router.push(newUrl)
        })
    }, [debouncedSearchQuery, baseUrl, router])

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
    }

    return <SearchInput value={searchQuery} onChange={handleSearchChange} className={className} isLoading={isPending} />
}

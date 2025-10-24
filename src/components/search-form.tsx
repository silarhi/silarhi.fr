'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useTransition } from 'react'

import SearchInput from './search-input'

interface SearchFormProps {
    baseUrl: string
    className?: string
}

export default function SearchForm({ baseUrl, className }: SearchFormProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [, startTransition] = useTransition()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)

        startTransition(() => {
            const params = new URLSearchParams()
            if (value) {
                params.set('search', value)
            }
            // Reset to page 1 when searching
            params.set('page', '1')

            const newUrl = value ? `${baseUrl}?${params.toString()}` : baseUrl
            router.push(newUrl)
        })
    }

    return <SearchInput value={searchQuery} onChange={handleSearchChange} className={className} />
}

'use client'

import Form from 'next/form'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

import SearchInput from './search-input'

interface SearchFormProps {
    baseUrl: string
    className?: string
}

export default function SearchForm({ baseUrl, className }: SearchFormProps) {
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
    const [debouncedSearchQuery] = useDebounce(searchQuery, 300)
    const formRef = useRef<HTMLFormElement>(null)

    // Enhanced UX: auto-submit form on debounced input
    useEffect(() => {
        const currentSearch = searchParams.get('search') || ''

        // Only auto-submit if search query changed
        if (currentSearch === debouncedSearchQuery) {
            return
        }

        // Trigger form submission programmatically
        if (formRef.current) {
            // Use requestSubmit for proper form validation and event handling
            formRef.current.requestSubmit()
        }
    }, [debouncedSearchQuery, searchParams])

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
    }

    return (
        <Form
            ref={formRef}
            action={baseUrl}
            role="search"
            aria-label="Rechercher des projets"
            className={className}
            replace={true}
        >
            <SearchInput name="search" value={searchQuery} onChange={handleSearchChange} />
        </Form>
    )
}

'use client'

import React from 'react'

import { Search, Spinner, XCircle } from '@/components/ui/icons'
import { cn } from '@/utils/lib'

interface SearchInputProps {
    name?: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    isLoading?: boolean
}

export default function SearchInput({
    name = 'query',
    value,
    onChange,
    placeholder = 'Rechercher...',
    className,
    isLoading = false,
}: SearchInputProps) {
    return (
        <div className={cn('relative w-full', className)}>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                {isLoading ? (
                    <Spinner className="h-6 w-6 animate-spin text-gray-400" />
                ) : (
                    <Search className="h-6 w-6 text-gray-400" />
                )}
            </div>
            <input
                type="search"
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    'focus:border-primary focus:ring-primary/20 bg-surface dark:bg-light dark:border-border dark:text-foreground dark:placeholder-muted block w-full rounded-lg border border-gray-300 py-4 pr-12 pl-12 text-lg text-gray-900 placeholder-gray-500 shadow-sm transition-all focus:ring-2 focus:outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
                    isLoading && 'opacity-70'
                )}
                placeholder={placeholder}
                disabled={isLoading}
                aria-label={placeholder}
            />
            {value && !isLoading && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="dark:text-muted dark:hover:text-foreground absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
                    aria-label="Effacer la recherche"
                >
                    <XCircle className="h-6 w-6" />
                </button>
            )}
        </div>
    )
}

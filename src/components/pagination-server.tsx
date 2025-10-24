import React from 'react'

import PaginationLink from '@/components/pagination-link'
import { cn } from '@/utils/lib'

interface PaginationServerProps {
    currentPage: number
    totalPages: number
    baseUrl: string
    searchQuery?: string
    className?: string
}

export default function PaginationServer({
    currentPage,
    totalPages,
    baseUrl,
    searchQuery,
    className,
}: PaginationServerProps) {
    if (totalPages <= 1) {
        return null
    }

    const buildUrl = (page: number) => {
        const params = new URLSearchParams()
        params.set('page', page.toString())
        if (searchQuery) {
            params.set('search', searchQuery)
        }
        return `${baseUrl}?${params.toString()}`
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const showEllipsis = totalPages > 7

        if (!showEllipsis) {
            // Show all pages if 7 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (currentPage > 3) {
                pages.push('...')
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) {
                pages.push('...')
            }

            // Always show last page
            pages.push(totalPages)
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className={cn('flex items-center justify-center gap-2', className)}>
            {/* Previous button */}
            {currentPage === 1 ? (
                <span
                    className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-400"
                    aria-label="Page précédente"
                    aria-disabled="true"
                >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            ) : (
                <Link
                    href={buildUrl(currentPage - 1)}
                    className="hover:border-primary hover:bg-primary/5 hover:text-primary flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition-colors"
                    aria-label="Page précédente"
                >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            )}

            {/* Page numbers */}
            {pageNumbers.map((page, index) =>
                typeof page === 'number' ? (
                    page === currentPage ? (
                        <span
                            key={index}
                            className="border-primary bg-primary flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg border px-3 text-sm font-medium text-white shadow-sm"
                            aria-label={`Page ${page}`}
                            aria-current="page"
                        >
                            {page}
                        </span>
                    ) : (
                        <Link
                            key={index}
                            href={buildUrl(page)}
                            className="hover:border-primary hover:bg-primary/5 hover:text-primary flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition-colors"
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </Link>
                    )
                ) : (
                    <span key={index} className="flex h-10 items-center px-2 text-gray-400">
                        {page}
                    </span>
                )
            )}

            {/* Next button */}
            {currentPage === totalPages ? (
                <span
                    className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-400"
                    aria-label="Page suivante"
                    aria-disabled="true"
                >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            ) : (
                <Link
                    href={buildUrl(currentPage + 1)}
                    className="hover:border-primary hover:bg-primary/5 hover:text-primary flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition-colors"
                    aria-label="Page suivante"
                >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            )}
        </div>
    )
}

import Link from 'next/link'
import React from 'react'

import { ChevronLeft, ChevronRight } from '@/components/ui/icons'

interface PaginationServerProps {
    currentPage: number
    totalPages: number
    baseUrl: string
    searchParams?: string
    className?: string
}

export default function PaginationServer({
    currentPage,
    totalPages,
    baseUrl,
    searchParams,
    className,
}: PaginationServerProps) {
    if (totalPages <= 1) {
        return null
    }

    const buildUrl = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        return `${baseUrl}?${params.toString()}#projects-list`
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
        <nav aria-label="Pagination" role="navigation" className={className}>
            <div className="flex items-center justify-center gap-2">
                {/* Previous button */}
                {currentPage === 1 ? (
                    <span
                        className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                        aria-label="Page précédente"
                        aria-disabled="true"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </span>
                ) : (
                    <Link
                        href={buildUrl(currentPage - 1)}
                        className="hover:border-primary hover:bg-primary/5 hover:text-primary bg-surface flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 no-underline transition-colors dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                        aria-label="Page précédente"
                        prefetch={false}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                )}

                {/* Page numbers */}
                {pageNumbers.map((page, index) =>
                    typeof page === 'number' ? (
                        page === currentPage ? (
                            <span
                                key={index}
                                className="border-primary bg-primary text-surface dark:border-primary dark:bg-primary dark:text-surface flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium shadow-sm"
                                aria-label={`Page ${page}`}
                                aria-current="page"
                            >
                                {page}
                            </span>
                        ) : (
                            <Link
                                key={index}
                                href={buildUrl(page)}
                                className="hover:border-primary hover:bg-primary/5 hover:text-primary bg-surface flex h-10 min-w-10 items-center justify-center rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 no-underline transition-colors dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                                aria-label={`Page ${page}`}
                                prefetch={false}
                            >
                                {page}
                            </Link>
                        )
                    ) : (
                        <span key={index} className="flex h-10 items-center px-2 text-gray-400 dark:text-gray-500">
                            {page}
                        </span>
                    )
                )}

                {/* Next button */}
                {currentPage === totalPages ? (
                    <span
                        className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                        aria-label="Page suivante"
                        aria-disabled="true"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </span>
                ) : (
                    <Link
                        href={buildUrl(currentPage + 1)}
                        className="hover:border-primary hover:bg-primary/5 hover:text-primary bg-surface flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 no-underline transition-colors dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                        aria-label="Page suivante"
                        prefetch={false}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Link>
                )}
            </div>
        </nav>
    )
}

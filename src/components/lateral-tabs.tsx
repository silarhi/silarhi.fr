'use client'

import React, { useState } from 'react'

import { cn } from '@/utils/lib'

export interface LateralTabItem {
    id: string
    label: string
    content: React.ReactNode
}

interface LateralTabsProps {
    items: LateralTabItem[]
    defaultTab?: string
    className?: string
}

export default function LateralTabs({ items, defaultTab, className }: LateralTabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab ?? items[0]?.id)

    const activeItem = items.find((item) => item.id === activeTab)

    if (items.length === 0) {
        return null
    }

    return (
        <div className={cn('flex w-full flex-col gap-6 lg:flex-row', className)}>
            {/* Main content area with decorative border */}
            <div className="flex-1" role="tabpanel">
                <div className="group hover:border-primary/30 relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                    {/* Decorative corner gradient */}
                    <div className="from-primary/5 pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br to-purple-200/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />
                    <div className="relative">{activeItem?.content}</div>
                </div>
            </div>

            {/* Right sidebar with tab buttons */}
            <div className="lg:w-80">
                <div className="sticky top-4">
                    <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white via-gray-50 to-white p-3 shadow-lg">
                        {/* Background pattern */}
                        <div className="pointer-events-none absolute inset-0 opacity-5">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                                    backgroundSize: '20px 20px',
                                }}
                            />
                        </div>

                        <nav className="relative flex flex-col gap-2" role="tablist">
                            {items.map((item, index) => {
                                const isActive = activeTab === item.id
                                const isFirst = index === 0
                                const isLast = index === items.length - 1

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={cn(
                                            'group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-4 text-left text-sm font-medium transition-all duration-300',
                                            {
                                                'from-primary scale-105 bg-gradient-to-r to-purple-600 text-white shadow-lg':
                                                    isActive,
                                                'hover:bg-primary/5 text-gray-700 hover:scale-102 hover:shadow-md':
                                                    !isActive,
                                            }
                                        )}
                                        aria-selected={isActive}
                                        role="tab"
                                    >
                                        {/* Animated background on hover */}
                                        {!isActive && (
                                            <div className="from-primary/10 absolute inset-0 -z-10 bg-gradient-to-r to-purple-100/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        )}

                                        {/* Icon/Badge with different icons for different types */}
                                        <span
                                            className={cn(
                                                'relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300',
                                                {
                                                    'text-primary bg-white shadow-md': isActive,
                                                    'group-hover:bg-primary/10 group-hover:text-primary bg-gray-100 text-gray-600':
                                                        !isActive,
                                                }
                                            )}
                                        >
                                            {isFirst ? (
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                                </svg>
                                            ) : isLast ? (
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ) : (
                                                <span>{index + 1}</span>
                                            )}
                                            {/* Pulse effect on active */}
                                            {isActive && (
                                                <span className="absolute inset-0 animate-ping rounded-xl bg-white opacity-20" />
                                            )}
                                        </span>

                                        {/* Label */}
                                        <span className="flex-1 leading-tight">{item.label}</span>

                                        {/* Arrow indicator */}
                                        <svg
                                            className={cn('h-5 w-5 flex-shrink-0 transition-all duration-300', {
                                                'translate-x-0 opacity-100': isActive,
                                                '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100':
                                                    !isActive,
                                            })}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>

                                        {/* Active glow effect */}
                                        {isActive && (
                                            <div className="from-primary/20 absolute inset-0 -z-10 animate-pulse rounded-xl bg-gradient-to-r to-purple-600/20 blur-xl" />
                                        )}
                                    </button>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Creative info card */}
                    <div className="from-primary/10 mt-4 overflow-hidden rounded-2xl border-2 border-purple-200 bg-gradient-to-br via-purple-50 to-indigo-100 p-5 shadow-md">
                        <div className="relative">
                            {/* Decorative icon */}
                            <div className="from-primary mb-3 inline-flex rounded-xl bg-gradient-to-r to-purple-600 p-2.5 text-white shadow-lg">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                                <span className="text-primary font-bold">Navigation intuitive</span>
                                <br />
                                Explorez chaque phase du projet étape par étape
                            </p>
                            {/* Decorative dots */}
                            <div className="mt-3 flex gap-1.5">
                                <div className="bg-primary/60 h-1.5 w-1.5 rounded-full" />
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-500/60" />
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500/60" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

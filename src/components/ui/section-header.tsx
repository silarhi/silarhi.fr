import React from 'react'

import { cn } from '@/utils/lib'

import FadeInWhenVisible from './fade-in-when-visible'

interface SectionHeaderProps {
    title: React.ReactNode
    subtitle?: React.ReactNode
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className="py-6 text-center">
            <FadeInWhenVisible>
                {subtitle}
                <h2
                    className={cn('mb-6 text-4xl', {
                        'mt-4': subtitle,
                    })}
                >
                    {title}
                </h2>
            </FadeInWhenVisible>
        </div>
    )
}

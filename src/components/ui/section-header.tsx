import type React from 'react'

import Badge from './badge'
import FadeInWhenVisible from './fade-in-when-visible'

export interface SectionHeaderProps {
    title: React.ReactNode
    /** Short label shown as a badge above the title */
    eyebrow?: React.ReactNode
    /** One line under the title */
    description?: React.ReactNode
}

export default function SectionHeader({ title, eyebrow, description }: SectionHeaderProps) {
    return (
        <div className="mb-6 py-6 text-center">
            <FadeInWhenVisible>
                {eyebrow && (
                    <div className="mb-4">
                        <Badge variant="secondary">{eyebrow}</Badge>
                    </div>
                )}
                <h2 className="text-foreground text-3xl font-bold text-balance lg:text-4xl">{title}</h2>
                {description && (
                    <p className="text-foreground/80 mx-auto mt-4 max-w-2xl text-lg leading-relaxed">{description}</p>
                )}
            </FadeInWhenVisible>
        </div>
    )
}

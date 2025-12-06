import React from 'react'

import Section from '@/components/ui/section'
import { cn } from '@/utils/lib'

interface HeroTitleProps extends React.HTMLAttributes<HTMLElement> {
    pretitle?: React.ReactNode
    title: string
    description?: string
    overlap?: boolean
}

export default function HeroSection({
    pretitle,
    title,
    description,
    children,
    className,
    overlap = false,
}: HeroTitleProps) {
    return (
        <Section
            className={cn(
                'bg-surface border-border border-b pt-32 pb-16 lg:pt-40 lg:pb-24',
                {
                    'pb-32 lg:pb-40': overlap,
                },
                className
            )}
        >
            <div className="max-w-3xl">
                {pretitle && <div className="mb-6">{pretitle}</div>}

                <h1
                    className={cn('text-foreground mb-6 text-4xl font-bold text-balance lg:text-6xl', {
                        'mb-0': !description && !children,
                    })}
                >
                    {title}
                </h1>

                {description && (
                    <p
                        className={cn('text-foreground/80 text-lg leading-relaxed lg:text-xl', {
                            'mb-0': !children,
                        })}
                    >
                        {description}
                    </p>
                )}

                {children}
            </div>
        </Section>
    )
}

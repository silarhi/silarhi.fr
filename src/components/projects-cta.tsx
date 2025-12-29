import { ReactNode } from 'react'

import Button from '@/components/ui/button'
import { ArrowRight } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import { cn } from '@/utils/lib'

interface CTAButton {
    text: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-dark' | 'muted' | 'danger'
    showArrow?: boolean
}

interface ProjectsCTAProps {
    title?: string
    description?: string | ReactNode
    primaryButton?: CTAButton
    secondaryButton?: CTAButton
    className?: string
}

function ProjectCtaButton({ text, href, variant, showArrow }: CTAButton & { showArrow: boolean }) {
    return (
        <Button as="a" href={href} size="lg" variant={variant} className={cn({ group: showArrow })}>
            {text}
            {showArrow && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
        </Button>
    )
}

export default function ProjectsCTA({
    title = 'Prêt à lancer votre projet ?',
    description = 'Discutons de vos objectifs et découvrez comment nous pouvons vous accompagner dans votre transformation digitale.',
    primaryButton = {
        text: 'Démarrer un projet',
        href: '/#contact',
        variant: 'primary',
        showArrow: true,
    },
    secondaryButton = {
        text: 'Découvrir nos services',
        href: '/#services',
        variant: 'outline-primary',
        showArrow: false,
    },
    className,
}: ProjectsCTAProps) {
    const primaryArrow = primaryButton.showArrow ?? true
    const secondaryArrow = secondaryButton.showArrow ?? false

    return (
        <Section className={cn('bg-light border-border border-t py-16 lg:py-24', className)}>
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-foreground mb-6 text-3xl font-bold text-balance lg:text-5xl">{title}</h2>
                <p className="text-foreground/80 mb-8 text-lg leading-relaxed lg:text-xl">{description}</p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <ProjectCtaButton {...primaryButton} showArrow={primaryArrow} />
                    <ProjectCtaButton {...secondaryButton} showArrow={secondaryArrow} />
                </div>
            </div>
        </Section>
    )
}

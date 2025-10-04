import Section from '@/components/section'
import Title from '@/components/title'

interface HeroTitleProps {
    title: string
    subtitle?: string
}

export default function HeroTitle({ title, subtitle }: HeroTitleProps) {
    return (
        <Section className="bg-primary text-surface flex items-center justify-center" size="xl" fluid>
            <Title>{title}</Title>
            {subtitle && <p className="mt-3 text-center text-lg">{subtitle}</p>}
        </Section>
    )
}

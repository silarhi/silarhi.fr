import Section from '@/components/Section'
import Title from '@/components/Title'

interface HeroTitleProps {
    title: string
    subtitle?: string
}

export default function HeroTitle({ title, subtitle }: HeroTitleProps) {
    return (
        <Section className="text-bg-primary d-flex align-items-center justify-content-center" size={'xl'} fluid>
            <Title>{title}</Title>
            {subtitle && <p className="lead text-center mt-3">{subtitle}</p>}
        </Section>
    )
}

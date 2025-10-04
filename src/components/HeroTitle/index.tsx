import Section from '@/components/Section'
import Title from '@/components/Title'

interface HeroTitleProps {
    title: string
    subtitle?: string
}

export default function HeroTitle({ title, subtitle }: HeroTitleProps) {
    return (
        <Section className="bg-primary text-white flex items-center justify-center" size={'xl'} fluid>
            <Title>{title}</Title>
            {subtitle && <p className="text-lg text-center mt-3">{subtitle}</p>}
        </Section>
    )
}

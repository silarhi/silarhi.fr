import Section from '@/components/Section'
import Title from '@/components/Title'

interface HeroTitleProps {
    title: string
}

export default function HeroTitle({ title }: HeroTitleProps) {
    return (
        <Section className="text-bg-primary d-flex align-items-center justify-content-center" size={'xl'} fluid>
            <Title>{title}</Title>
        </Section>
    )
}

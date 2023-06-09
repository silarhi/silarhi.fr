import Section from 'components/Section'
import Title from 'components/Title'

export default function HeroTitle({ title }) {
    return (
        <Section className="text-bg-primary d-flex align-items-center justify-content-center" size={'xl'} fluid>
            <Title>{title}</Title>
        </Section>
    )
}

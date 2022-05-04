import Section from "components/Section/Section";
import Title from "components/Title/Title";

export default function HeroTitle({title}) {
  return (
    <Section className="text-bg-primary" fluid>
        <Title>{title}</Title>
    </Section>
  )
}

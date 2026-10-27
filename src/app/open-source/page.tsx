import type { Metadata } from 'next'

import HeroSection from '@/components/hero-section'
import JsonLd from '@/components/json-ld'
import OpenSourcePackages from '@/components/open-source-packages'
import ProjectsCTA from '@/components/projects-cta'
import Section from '@/components/ui/section'
import { generateOpenSourcePageSchemas } from '@/lib/schemas/open-source'
import { OPEN_SOURCE_PACKAGES } from '@/utils/open-source'
import { getCanonicalUrl } from '@/utils/url'

export const metadata: Metadata = {
    title: 'Open source : bibliothèques PHP et bundles Symfony | SILARHI',
    description:
        'Les bibliothèques PHP et bundles Symfony open source de SILARHI : images responsives, composants Twig UX, Hotwire Turbo, fichiers bancaires CFONB, CAF et QIF.',
    alternates: {
        canonical: getCanonicalUrl('/open-source'),
    },
}

export default function OpenSourcePage() {
    return (
        <>
            <JsonLd data={generateOpenSourcePageSchemas(OPEN_SOURCE_PACKAGES)} />
            <HeroSection
                title="Open source"
                description="Les bibliothèques PHP et bundles Symfony que nous développons pour nos projets clients, puis publions sous licence MIT : documentés, testés et maintenus."
            />

            <Section className="bg-light">
                <OpenSourcePackages packages={OPEN_SOURCE_PACKAGES} />
            </Section>

            <ProjectsCTA
                title="Un projet Symfony ?"
                description="Nous apportons la même exigence à vos applications. Parlons de votre projet."
            />
        </>
    )
}

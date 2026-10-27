import type { Metadata } from 'next'
import { Fragment } from 'react'

import ContactForm from '@/components/contact-form'
import HeroSection from '@/components/hero-section'
import JsonLd from '@/components/json-ld'
import { Clock, Envelope, Map, Phone } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import { COMPANY_INFO, generateWebPageSchema } from '@/lib/schemas'
import { cn } from '@/utils/lib'
import { getCanonicalUrl } from '@/utils/url'

export const metadata: Metadata = {
    title: `Contactez-nous - SILARHI`,
    alternates: {
        canonical: getCanonicalUrl('/contact'),
    },
}

// Generate contact page schemas
const contactPageSchemas = [
    generateWebPageSchema({
        name: 'Contactez-nous - SILARHI',
        description:
            "Besoin d'un renseignement ou d'un devis ? Contactez notre agence de développement Web à Toulouse.",
        url: getCanonicalUrl('/contact'),
        type: 'ContactPage',
        breadcrumbs: [
            { name: 'Accueil', url: COMPANY_INFO.url },
            { name: 'Contact', url: getCanonicalUrl('/contact') },
        ],
    }),
]

export default function ContactPage() {
    return (
        <>
            <JsonLd data={contactPageSchemas} />
            <HeroSection
                title="Contact"
                description="Besoin d'un renseignement ou d'un devis ? Vous êtes au bon endroit."
            />

            <Section>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12 xl:gap-16">
                    <div className="md:col-span-7">
                        <ContactSection />
                    </div>
                    <div className="md:col-span-5">
                        <InfoSection />
                    </div>
                </div>
            </Section>
        </>
    )
}

function ContactSection() {
    return (
        <>
            <div>
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Contact</h2>
                <p className="text-foreground/80">
                    Laissez-nous un message et nous vous répondrons dans les plus brefs délais.
                </p>
            </div>
            <div>
                <ContactForm />
            </div>
        </>
    )
}

function InfoSection() {
    const contactItems = [
        {
            icon: Map,
            content: COMPANY_INFO.addressLines.map((line, index) => (
                <Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                </Fragment>
            )),
        },
        {
            icon: Clock,
            content: (
                <>
                    Du lundi au vendredi
                    <br />
                    De 9h à 19h30
                </>
            ),
        },
        {
            icon: Phone,
            content: (
                <a href={`tel:${COMPANY_INFO.telephone}`} className="py-1">
                    {COMPANY_INFO.telephoneDisplay}
                </a>
            ),
        },
        {
            icon: Envelope,
            content: (
                <a href={`mailto:${COMPANY_INFO.email}`} className="py-1">
                    {COMPANY_INFO.email}
                </a>
            ),
        },
    ]

    return (
        <>
            <div>
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl">SILARHI</h2>
                <p className="text-foreground/80">Les infos pratiques, c&apos;est par ici.</p>
            </div>
            <div>
                <ul className="space-y-0">
                    {contactItems.map((item, index) => {
                        const Icon = item.icon
                        const isLast = index === contactItems.length - 1

                        return (
                            <li
                                key={index}
                                className={cn('border-border flex flex-nowrap items-baseline py-3', {
                                    'border-b': !isLast,
                                })}
                            >
                                <span className="text-primary mr-1 md:mr-2 lg:mr-3">
                                    <Icon />
                                </span>
                                <span className="text-foreground/80">{item.content}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

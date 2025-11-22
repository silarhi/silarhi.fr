import { Metadata } from 'next'

import ContactForm from '@/components/contact-form'
import HeroSection from '@/components/hero-section'
import FadeInWhenVisible from '@/components/ui/fade-in-when-visible'
import { Clock, Envelope, Map, Phone } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import { cn } from '@/utils/lib'

export const metadata: Metadata = {
    title: `Contactez-nous - SILARHI`,
}

export default function ContactPage() {
    return (
        <>
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
            <FadeInWhenVisible delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Contact</h2>
                <p className="text-foreground/80">
                    Laissez-nous un message et nous vous répondrons dans les plus brefs délais.
                </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
                <ContactForm />
            </FadeInWhenVisible>
        </>
    )
}

function InfoSection() {
    const contactItems = [
        {
            icon: Map,
            content: (
                <>
                    116 Route d&apos;Espagne
                    <br />
                    HELIOS 4<br />
                    BAT 113
                    <br />
                    31100 Toulouse
                </>
            ),
        },
        {
            icon: Clock,
            content: (
                <>
                    Du lundi au vendredi
                    <br />
                    De 9h à 18h
                </>
            ),
        },
        {
            icon: Phone,
            content: <a href="tel:+33607275826">0 607.275.826</a>,
        },
        {
            icon: Envelope,
            content: <a href="mailto:%68ell%6F@si%6Ca%72hi.fr">hello@silarhi.fr</a>,
        },
    ]

    return (
        <>
            <FadeInWhenVisible delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl">SILARHI</h2>
                <p className="text-foreground/80">Les infos pratiques, c&apos;est par ici.</p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
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
            </FadeInWhenVisible>
        </>
    )
}

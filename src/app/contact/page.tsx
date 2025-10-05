import { Metadata } from 'next'

import ContactForm from '@/components/contact-form'
import Hero from '@/components/hero-title'
import { Clock, Envelope, Map, Phone } from '@/components/icons'
import Section from '@/components/section'

export const metadata: Metadata = {
    title: `Contactez-nous - SILARHI`,
}

export default function ContactPage() {
    return (
        <>
            <Hero title="Contact" subtitle="Besoin d'un renseignement ou d'un devis ? Vous êtes au bon endroit." />
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
                <ContactSection />
                <InfoSection />
            </div>
        </>
    )
}

function ContactSection() {
    return (
        <Section id="contact" className="xl:pl-4xl md:pr-lg lg:pr-xl xl:pr-2xl px-4" paddingX={false} container={false}>
            <div className="container md:mr-0">
                <h2 className="mb-3 text-3xl">Contact</h2>
                <p className="text-muted">
                    Laissez-nous un message et nous vous répondrons dans les plus brefs délais.
                </p>
                <ContactForm />
            </div>
        </Section>
    )
}

function InfoSection() {
    return (
        <Section
            id="silarhi"
            className="xl:pr-4xl md:pl-lg lg:pl-xl xl:pl-2xl bg-[#f4f6fd] px-4"
            paddingX={false}
            container={false}
        >
            <div className="container-half-md container md:ml-0">
                <h2 className="mb-3 text-3xl">SILARHI</h2>
                <p className="text-muted">Les infos pratiques, c&apos;est par ici.</p>
                <ul className="space-y-0">
                    <li className="border-border flex flex-nowrap border-b py-3">
                        <span className="text-primary mr-1 md:mr-2 lg:mr-3">
                            <Map />
                        </span>
                        <span className="text-muted">
                            116 Route d&apos;Espagne
                            <br />
                            HELIOS 4<br />
                            BAT 113
                            <br />
                            31100 Toulouse
                        </span>
                    </li>
                    <li className="border-border flex flex-nowrap border-b py-3">
                        <span className="text-primary mr-1 md:mr-2 lg:mr-3">
                            <Clock />
                        </span>
                        <span className="text-muted">
                            Du lundi au vendredi
                            <br />
                            De 9h à 18h
                        </span>
                    </li>
                    <li className="border-border flex flex-nowrap border-b py-3">
                        <span className="text-primary mr-1 md:mr-2 lg:mr-3">
                            <Phone />
                        </span>
                        <span className="text-muted">
                            <a href="tel:+33607275826">0 607.275.826</a>
                        </span>
                    </li>
                    <li className="border-border flex flex-nowrap py-3">
                        <span className="text-primary mr-1 md:mr-2 lg:mr-3">
                            <Envelope />
                        </span>
                        <span className="text-muted">
                            <a href="mailto:%68ell%6F@si%6Ca%72hi.fr">hello@silarhi.fr</a>
                        </span>
                    </li>
                </ul>
            </div>
        </Section>
    )
}

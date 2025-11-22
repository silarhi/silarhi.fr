import type { Metadata } from 'next'
import Link from 'next/link'

import HeroSection from '@/components/hero-section'
import Button from '@/components/ui/button'
import FadeInWhenVisible from '@/components/ui/fade-in-when-visible'
import { ArrowLeft, FaceSad } from '@/components/ui/icons'
import Section from '@/components/ui/section'

export const metadata: Metadata = {
    title: 'Page introuvable - SILARHI',
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
}

export default function NotFound() {
    return (
        <>
            <HeroSection
                title="Page introuvable"
                description="Désolé, la page que vous recherchez n'existe pas ou a été déplacée."
            />

            <Section className="text-center">
                <FadeInWhenVisible delay={0.1}>
                    <div className="mx-auto max-w-2xl">
                        <div className="text-primary mb-8 flex justify-center">
                            <FaceSad className="size-32" />
                        </div>

                        <h2 className="mb-6 text-2xl font-bold lg:text-3xl">Erreur 404</h2>

                        <p className="text-foreground/80 mb-8 text-lg">
                            Il semblerait que cette page se soit perdue dans le code. Pas de panique, nous sommes là
                            pour vous aider à retrouver votre chemin !
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button as="a" href="/" size="lg">
                                <ArrowLeft className="size-5" />
                                Retour à l'accueil
                            </Button>

                            <Button as="a" href="/projets" variant="outline-primary" size="lg">
                                Voir nos projets
                            </Button>
                        </div>

                        <div className="mt-12">
                            <p className="text-foreground/60 mb-4 text-sm">Liens utiles :</p>
                            <ul className="text-primary flex flex-wrap justify-center gap-x-6 gap-y-2">
                                <li>
                                    <Link href="/technologies" className="hover:text-primary-light underline">
                                        Technologies
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/clients" className="hover:text-primary-light underline">
                                        Clients
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-primary-light underline">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </Section>
        </>
    )
}

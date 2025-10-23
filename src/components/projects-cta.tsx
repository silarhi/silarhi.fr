import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import Button from '@/components/button'

export default function ProjectsCTA() {
    return (
        <section className="bg-primary py-16 text-white lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-bold text-balance lg:text-5xl">Prêt à lancer votre projet ?</h2>
                    <p className="mb-8 text-lg leading-relaxed text-white/90 lg:text-xl">
                        Discutons de vos objectifs et découvrez comment nous pouvons vous accompagner dans votre
                        transformation digitale.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/#contact">
                            <Button
                                size="lg"
                                className="bg-secondary text-secondary-foreground hover:bg-secondary-dark font-semibold"
                            >
                                Démarrer un projet
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/#services">
                            <Button
                                size="lg"
                                variant="outline-primary"
                                className="hover:text-primary border-white bg-transparent font-semibold text-white hover:bg-white"
                            >
                                Découvrir nos services
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

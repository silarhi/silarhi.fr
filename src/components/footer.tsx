import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from '@/components/button'
import iconEnvelope from '@/icons/envelope_hem0.svg'
import logo from '@/public/images/logo-4096.png'
import { cn } from '@/utils/lib'

export default function Footer() {
    const pathname = usePathname()
    const linkClasses = 'text-inherit hover:text-secondary transition-colors'

    return (
        <footer
            className={cn('bg-dark text-surface', {
                'mt-20': pathname !== '/contact',
            })}
        >
            {pathname !== '/contact' && (
                <div className="bg-secondary text-dark py-6">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-center lg:justify-start lg:gap-8 lg:text-left">
                            <Image
                                src={iconEnvelope}
                                alt="Contactez nous"
                                height={160}
                                className="-mt-3xl mx-auto lg:mx-0"
                            />
                            <p className="mb-0">
                                <span className="text-xl font-bold">Besoin d’un renseignement ?</span>
                                <br />
                                <span className="font-medium">Vous avez un projet ?</span>
                            </p>
                            <span className="lg:ml-auto">
                                <Button as="a" href="/contact" variant="outline-dark">
                                    Contactez-nous
                                </Button>
                            </span>
                        </div>
                    </div>
                </div>
            )}
            <div className="border-dark/10 border-t py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-4">
                            <Link
                                href="/"
                                className="hover:text-secondary mb-6 flex items-center space-x-2 text-inherit transition-colors"
                            >
                                <Image src={logo} alt="SILARHI" height={60} className={cn('h-14 w-auto')} />
                                <span className="text-xl">SILARHI</span>
                            </Link>
                            <p className="text-surface/80 mb-4 leading-relaxed">
                                Agence web basée à Toulouse, spécialisée dans le développement d&#39;applications sur
                                mesure avec Symfony, React et les technologies modernes.
                            </p>
                            <div className="space-y-1">
                                <p className="mb-0 font-semibold">Notre adresse</p>
                                <p className="text-surface/80 mb-0">
                                    116 route d&#39;Espagne
                                    <br />
                                    BAL 411
                                    <br />
                                    31100 Toulouse
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
                            <div>
                                <h6 className="mb-4 text-base font-bold">Navigation</h6>
                                <div className="space-y-2">
                                    <Link href="/" className={cn(linkClasses, 'text-surface/80 block')}>
                                        Accueil
                                    </Link>
                                    <Link href="/projets" className={cn(linkClasses, 'text-surface/80 block')}>
                                        Projets
                                    </Link>
                                    <Link href="/technologies" className={cn(linkClasses, 'text-surface/80 block')}>
                                        Technologies
                                    </Link>
                                    <Link href="/clients" className={cn(linkClasses, 'text-surface/80 block')}>
                                        Clients
                                    </Link>
                                    <Link href="/contact" className={cn(linkClasses, 'text-surface/80 block')}>
                                        Contact
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h6 className="mb-4 text-base font-bold">Expertises Backend</h6>
                                <div className="space-y-2">
                                    <Link
                                        href="/projets/tag/symfony"
                                        className={cn(linkClasses, 'text-surface/80 block')}
                                    >
                                        Symfony
                                    </Link>
                                    <Link
                                        href="/projets/tag/apiplatform"
                                        className={cn(linkClasses, 'text-surface/80 block')}
                                    >
                                        API Platform
                                    </Link>
                                    <Link href="/projets/tag/php" className={cn(linkClasses, 'text-surface/80 block')}>
                                        PHP
                                    </Link>
                                    <Link
                                        href="/projets/tag/doctrine"
                                        className={cn(linkClasses, 'text-surface/80 block')}
                                    >
                                        Doctrine
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h6 className="mb-4 text-base font-bold">Expertises Frontend</h6>
                                <div className="space-y-2">
                                    <Link
                                        href="/projets/tag/react"
                                        className={cn(linkClasses, 'text-surface/80 block')}
                                    >
                                        React
                                    </Link>
                                    <Link
                                        href="/projets/tag/nextjs"
                                        className={cn(linkClasses, 'text-surface/80 block')}
                                    >
                                        Next.js
                                    </Link>
                                    <Link
                                        href="/projets/tag/typescript"
                                        className={cn(linkClasses, 'text-surface/80 block')}
                                    >
                                        TypeScript
                                    </Link>
                                    <Link
                                        href="/projets/tag/tailwind"
                                        className={cn(linkClasses, 'text-surface/80 block')}
                                    >
                                        Tailwind CSS
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h6 className="mb-4 text-base font-bold">Informations</h6>
                                <div className="space-y-2">
                                    <Link href="/mentions-legales" className={cn(linkClasses, 'text-surface/80 block')}>
                                        Mentions légales
                                    </Link>
                                    <Link
                                        href="/conditions-generales-de-vente"
                                        className={cn(linkClasses, 'text-surface/80 block')}
                                    >
                                        CGV
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-light/10 border-t py-4">
                <div className="container mx-auto px-4">
                    <p className="mb-0">
                        Site développé par{' '}
                        <a href="https://sainthillier.fr" className={linkClasses}>
                            Guillaume Sainthillier
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

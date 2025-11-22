'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { montserrat } from '@/app/fonts'
import Button from '@/components/button'
import iconEnvelope from '@/icons/envelope_hem0.svg'
import logo from '@/public/images/logo-4096.png'
import { cn } from '@/utils/lib'

const footerSections = [
    {
        title: 'Navigation',
        links: [
            { href: '/', label: 'Accueil' },
            { href: '/projets', label: 'Projets' },
            { href: '/contact', label: 'Contact' },
        ],
    },
    {
        title: 'Expertises Backend',
        links: [
            { href: '/technologies/php', label: 'PHP' },
            { href: '/technologies/symfony', label: 'Symfony' },
            { href: '/technologies/api-platform', label: 'API Platform' },
        ],
    },
    {
        title: 'Expertises Frontend',
        links: [
            { href: '/technologies/react', label: 'React' },
            { href: '/technologies/bootstrap', label: 'Bootstrap' },
            { href: '/technologies/tailwind', label: 'Tailwind CSS' },
        ],
    },
    {
        title: 'Informations',
        links: [
            { href: '/mentions-legales', label: 'Mentions légales' },
            { href: '/conditions-generales-de-vente', label: 'CGV' },
        ],
    },
]

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
                                <span className={cn('text-xl', montserrat.className)}>SILARHI</span>
                            </Link>
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
                            {footerSections.map((section) => (
                                <div key={section.title}>
                                    <h6 className="mb-4 text-base font-bold">{section.title}</h6>
                                    <div className="space-y-2">
                                        {section.links.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(linkClasses, 'text-surface/80 block')}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

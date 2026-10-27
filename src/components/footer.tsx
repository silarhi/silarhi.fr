'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import { montserrat } from '@/app/fonts'
import Button from '@/components/ui/button'
import iconEnvelope from '@/icons/envelope_hem0.svg'
import { COMPANY_INFO } from '@/lib/schemas'
import logo from '@/public/images/logo-4096.png'
import { cn } from '@/utils/lib'

const footerSections = [
    {
        title: 'Navigation',
        links: [
            { href: '/', label: 'Accueil' },
            { href: '/projets', label: 'Projets' },
            { href: '/open-source', label: 'Open source' },
            { href: '/contact', label: 'Contact' },
            { href: 'https://www.linkedin.com/company/silarhi', label: 'LinkedIn', external: true },
        ],
    },
    {
        title: 'Services',
        links: [
            { href: '/developpement-logiciel-sur-mesure', label: 'Logiciel métier sur mesure' },
            { href: '/reprise-application-web-existante', label: "Reprise d'application" },
            { href: '/tierce-maintenance-applicative', label: 'Tierce maintenance applicative' },
            { href: '/integration-flux-bancaires', label: 'Intégration bancaire' },
            { href: '/modernisation-interface-symfony', label: 'Modernisation Symfony UX' },
        ],
    },
    {
        title: 'Expertises',
        links: [
            { href: '/technologies/symfony', label: 'Symfony' },
            { href: '/technologies/php', label: 'PHP' },
            { href: '/technologies/api-platform', label: 'API Platform' },
            { href: '/technologies/react', label: 'React' },
            { href: '/technologies', label: 'Toutes les technologies' },
        ],
    },
    {
        title: 'Informations',
        links: [
            { href: '/mentions-legales', label: 'Mentions légales' },
            { href: '/conditions-generales-de-vente', label: 'CGV' },
            { href: '/politique-de-confidentialite', label: 'Confidentialité' },
            { href: '/cookies', label: 'Cookies' },
        ],
    },
]

export default function Footer() {
    const pathname = usePathname()

    return (
        <footer
            className={cn('bg-surface-dark text-dark-foreground dark:bg-background print:hidden', {
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
                                <Button
                                    as="a"
                                    href="/contact"
                                    variant="outline-dark"
                                    data-analytics-event="cta"
                                    data-analytics-location="footer-banner"
                                >
                                    Contactez-nous
                                </Button>
                            </span>
                        </div>
                    </div>
                </div>
            )}
            <div className="border-surface-dark/10 dark:border-border border-t py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-4">
                            <Link
                                href="/"
                                className="hover:text-secondary mb-6 flex items-center space-x-2 text-inherit transition-colors"
                            >
                                <Image
                                    src={logo}
                                    alt="SILARHI"
                                    height={60}
                                    className={cn('h-14 w-auto')}
                                    placeholder="blur"
                                />
                                <span className={cn('text-xl', montserrat.className)}>SILARHI</span>
                            </Link>
                            <div className="space-y-1">
                                <p className="mb-0 font-semibold">Notre adresse</p>
                                <p className="text-dark-foreground/80 dark:text-dark-foreground/90 mb-0">
                                    {COMPANY_INFO.addressLines.map((line, index) => (
                                        <Fragment key={line}>
                                            {index > 0 && <br />}
                                            {line}
                                        </Fragment>
                                    ))}
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
                                                {...('external' in link && link.external
                                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                                    : {})}
                                                className={cn(
                                                    'hover:text-secondary text-dark-foreground/80 dark:text-dark-foreground/90 block transition-colors'
                                                )}
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

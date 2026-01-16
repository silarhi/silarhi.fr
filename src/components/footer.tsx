import Image from 'next/image'
import Link from 'next/link'

import { montserrat } from '@/app/fonts'
import FooterContactBanner from '@/components/footer-contact-banner'
import FooterWrapper from '@/components/footer-wrapper'
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
    return (
        <FooterWrapper className="bg-surface-dark text-dark-foreground dark:bg-background">
            <FooterContactBanner />
            <div className="border-surface-dark/10 dark:border-border border-t py-12">
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
                                <p className="text-dark-foreground/80 dark:text-dark-foreground/90 mb-0">
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
        </FooterWrapper>
    )
}

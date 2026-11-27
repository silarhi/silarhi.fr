import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { Fragment } from 'react'

import CallToAction from '@/components/call-to-action'
import ClientsSection from '@/components/clients-section'
import JsonLd from '@/components/json-ld'
import Markdown from '@/components/markdown'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import CardGrid from '@/components/ui/card-grid'
import FadeInWhenVisible from '@/components/ui/fade-in-when-visible'
import { ArrowRight, Check, XMark } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import SectionHeader from '@/components/ui/section-header'
import iconProgramming from '@/icons/dev-productivity_5wps.svg'
import coding from '@/icons/floating-cogs.svg'
import iconIdeas from '@/icons/ideas_vn7a.svg'
import iconCloud from '@/icons/maintenance_4unj.svg'
import iconMeeting from '@/icons/meeting_dunc.svg'
import { generateLocalBusinessSchema, generateServicesSchema, generateWebPageSchema } from '@/lib/schemas'
import home from '@/public/images/home.jpg'
import { getAllClients } from '@/utils/client'
import { getTotalEmployeeHours } from '@/utils/employees'
import { cn } from '@/utils/lib'
import { getAllProjects, getClientLinksData } from '@/utils/project'
import { getAllServices, type Service as ServicePage } from '@/utils/service'
import { getCanonicalUrl } from '@/utils/url'

import { lato } from './fonts'

export const metadata: Metadata = {
    title: `Développement d'applications Web & PHP à Toulouse - SILARHI`,
    description: `Développement d'applications Web à Toulouse et en France. Donnez vie à vos idées d'applications responsive & mobiles. Devis rapide et gratuit.`,
    alternates: {
        canonical: getCanonicalUrl(),
    },
}

interface Feature {
    icon: string
    title: string
    description: string
}

interface Employee {
    name: string
    from: Date
    to?: Date
    coffeesPerDay: number
    hoursPerDay: number
}

interface NumberData {
    value: number | string
    unit: string
    text: string
}

const FEATURES: Feature[] = [
    {
        icon: iconMeeting,
        title: 'Analyse',
        description:
            'Nous étudions précisément votre besoin pour éliminer toute zone d\u2019ombre. Vous obtenez une vision claire du projet avant même de commencer.',
    },
    {
        icon: iconIdeas,
        title: 'Conception',
        description:
            'Nous concevons une solution sur mesure, pensée pour durer. Vous démarrez avec un produit pensé pour évoluer facilement.',
    },
    {
        icon: iconProgramming,
        title: 'Développement',
        description:
            'Nous développons une application Web robuste, moderne et sécurisée. Votre application évolue proprement grâce à un code clair et maintenable.',
    },
    {
        icon: iconCloud,
        title: 'Déploiement',
        description:
            'Nous assurons un déploiement fluide, sans interruption de votre activité. Votre solution est mise en production avec des outils fiables et automatisés.',
    },
]

// What we also do, without a page of its own (the service pages are shown as cards above)
const OTHER_SERVICES: string[] = [
    `**Applications responsives**, adaptées aux mobiles et tablettes`,
    `Développement spécifique d'API`,
    `Migration de version Symfony et PHP`,
    `Gestion de l'infrastructure serveur / cloud`,
    `Mise en place d'intégration continue / déploiement continu`,
    `Intégration de maquette UI / UX`,
    `Audit de sécurité`,
]

const NOT_OFFERED: string[] = [
    `Développement d'applications mobiles natives (iOS, Android)`,
    `Développement de site e-Commerce`,
    `Développement de plugin type Wordpress, Drupal`,
    `Audit SEO`,
    `Webmarketing`,
    `Hébergement de sites Internet`,
    `Création de logos / identité visuelle (en revanche, nous pouvons vous recommander des graphistes)`,
]

const COMPANY_START_DATE = new Date('2018-08-01')

const EMPLOYEES: Employee[] = [
    {
        name: 'Guillaume',
        from: new Date(COMPANY_START_DATE),
        coffeesPerDay: 3,
        hoursPerDay: 9,
    },
    {
        name: 'Florian',
        from: new Date('2020-09-01'),
        to: new Date('2023-09-15'),
        coffeesPerDay: 0,
        hoursPerDay: 7,
    },
    {
        name: 'Rémy',
        from: new Date('2022-01-01'),
        to: new Date('2024-03-15'),
        coffeesPerDay: 4,
        hoursPerDay: 8,
    },
    {
        name: 'Maxime',
        from: new Date('2022-11-02'),
        to: new Date('2024-04-01'),
        coffeesPerDay: 3,
        hoursPerDay: 8,
    },
]

function getNumbers(clientsCount: number, projectsCount: number): NumberData[] {
    return [
        {
            value: getTotalEmployeeHours(EMPLOYEES),
            unit: 'Heures',
            text: `de développement investies dans la réussite de nos clients`,
        },
        {
            value: clientsCount,
            unit: 'Clients',
            text: `nous confient leurs projets les plus ambitieux`,
        },
        {
            value: projectsCount,
            unit: 'Projets',
            text: `livrés avec succès depuis notre création`,
        },
    ]
}

function HeroSection() {
    return (
        <div className="relative h-svh w-full overflow-hidden">
            <div className="absolute top-0 left-0 z-1 h-full w-full bg-black opacity-60"></div>
            <Image
                src={home}
                sizes="100vw"
                fill
                style={{ objectFit: 'cover' }}
                priority
                placeholder="blur"
                alt="SILARHI, Agence de développement Web Toulouse"
            />
            <div className="absolute z-2 flex h-full w-full flex-col items-center justify-center text-white">
                <Section>
                    {/* No entrance animation: the h1 is the LCP element and FadeInWhenVisible hides it until hydration */}
                    <div className="mx-auto max-w-4xl">
                        <div>
                            <h1 className="text-5xl font-bold text-shadow-lg lg:text-6xl xl:text-7xl">
                                Développement d&apos;applications Web
                                <br />
                                <Badge
                                    variant="secondary"
                                    className="bg-secondary/80 dark:bg-secondary/70 dark:text-surface text-gray-900 text-shadow-none"
                                >
                                    À Toulouse &amp; en France
                                </Badge>
                            </h1>
                        </div>
                        <div>
                            <p className="mt-4 mb-0 text-2xl uppercase text-shadow-lg">
                                Transformez vos ambitions digitales en <span className="text-primary">réalité</span>
                            </p>
                        </div>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
                            <Button
                                as="a"
                                size="lg"
                                href="/contact"
                                data-analytics-event="cta"
                                data-analytics-location="home-hero"
                            >
                                Parler de votre projet
                            </Button>
                            <Button as="a" size="lg" href="/projets" variant="outline-light">
                                Voir nos projets
                            </Button>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    )
}

function PresentationSection() {
    return (
        <Section id="presentation" className="bg-primary-dark relative z-2 text-white">
            <Image
                src={coding}
                alt="Coding"
                className="absolute top-0 left-0 -z-1 h-full w-full object-cover opacity-5"
                height={160}
                sizes="100vw"
            />
            <FadeInWhenVisible>
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                        SILARHI est une agence de développement spécialisée dans la réalisation d&apos;applications Web
                        sur mesure.
                    </h2>
                    <p className="text-lg">
                        Spécialistes de l&apos;écosystème PHP, nous développons ou reprenons vos projets en Symfony, du
                        prototype à la mise en ligne.
                    </p>
                </div>
            </FadeInWhenVisible>
        </Section>
    )
}

function Arrow() {
    return (
        <div className="ml-[50%]">
            <div className="relative h-6 w-0.5 bg-gray-300 md:h-10">
                <div className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-t-8 border-r-4 border-l-4 border-t-gray-300 border-r-transparent border-l-transparent"></div>
            </div>
        </div>
    )
}

function MethodologySection() {
    return (
        <Section id="methodologie" className="bg-light border-border border-t">
            <SectionHeader
                title={
                    <span>
                        Un processus éprouvé pour <span className="text-primary">votre succès</span>
                    </span>
                }
                subtitle={<Badge variant="secondary">Notre méthodologie</Badge>}
            />

            <div className="mx-auto my-12 max-w-2xl space-y-4">
                <FadeInWhenVisible delay={0.1}>
                    <div className="text-center">
                        <span className="bg-primary-light/10 border-primary/10 dark:bg-primary/20 dark:border-primary/10 inline-block rounded-lg border-2 p-3 md:p-4">
                            <h3 className="text-base font-bold md:text-lg">Prise de contact / devis</h3>
                        </span>
                    </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.15}>
                    <Arrow />
                </FadeInWhenVisible>

                {FEATURES.map((stage, index) => (
                    <Fragment key={index}>
                        <FadeInWhenVisible delay={0.2 + index * 0.15}>
                            <div className={cn('flex items-start gap-3 md:gap-4')}>
                                <div className="bg-surface border-border flex-1 overflow-hidden rounded-xl border shadow-lg">
                                    <div className="p-4 md:p-6">
                                        <div className="flex flex-col items-start gap-4 md:flex-row md:gap-6">
                                            <div className="flex h-32 w-full shrink-0 items-center justify-center md:w-32">
                                                <Image src={stage.icon} sizes="100vw" height={128} alt={stage.title} />
                                            </div>

                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <span className="bg-primary/10 text-primary flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                                                        {index + 1}
                                                    </span>
                                                    <h3 className="text-lg font-bold md:text-xl">{stage.title}</h3>
                                                </div>
                                                <p className="text-foreground/80">{stage.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        {index < FEATURES.length - 1 && (
                            <FadeInWhenVisible delay={0.2 + index * 0.15 + 0.075}>
                                <Arrow />
                            </FadeInWhenVisible>
                        )}
                    </Fragment>
                ))}

                <FadeInWhenVisible delay={0.2 + FEATURES.length * 0.15 - 0.075}>
                    <Arrow />
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.2 + FEATURES.length * 0.15}>
                    <div className="text-center">
                        <span className="bg-success/10 border-success/10 dark:bg-success/20 dark:border-success/20 inline-block rounded-lg border-2 p-3 md:p-4">
                            <h3 className="text-base font-bold md:text-lg">
                                Client satisfait
                                <Check className="ml-2 inline-block" />
                            </h3>
                        </span>
                    </div>
                </FadeInWhenVisible>
            </div>
            <CallToAction />
        </Section>
    )
}

function ServiceCard({ service }: { service: ServicePage }) {
    return (
        <Link
            href={`/${service.slug}`}
            className="bg-surface dark:bg-surface-elevated border-border hover:border-primary/40 group flex w-full flex-col rounded-2xl border p-6 text-inherit shadow-sm transition-[border-color,box-shadow] hover:no-underline hover:shadow-md"
        >
            <span className="text-primary dark:text-primary-light mb-2 text-xs font-semibold tracking-wide uppercase">
                {service.category ?? 'Service'}
            </span>
            <h3 className="text-foreground mb-3 text-xl font-bold">{service.title}</h3>
            <p className="text-foreground/80 mb-6 flex-1">{service.excerpt}</p>
            <span className="text-primary dark:text-primary-light inline-flex items-center gap-2 font-medium">
                En savoir plus
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
        </Link>
    )
}

function ServiceList({ items, supported, title }: { items: string[]; supported: boolean; title: React.ReactNode }) {
    return (
        <div>
            <h3 className="text-primary-dark dark:text-primary mb-4 text-2xl font-light">{title}</h3>
            <div className="bg-surface dark:bg-light dark:text-foreground border-border rounded-lg border shadow-lg">
                <ul>
                    {items.map((item) => (
                        <li
                            key={item}
                            className="border-border flex items-center gap-x-4 border-b px-4 py-3 last:border-0"
                        >
                            <div
                                className={cn('flex size-5 shrink-0 items-center justify-center rounded-full', {
                                    'bg-success/25 text-success': supported,
                                    'bg-error/25 text-error': !supported,
                                })}
                            >
                                {supported ? (
                                    <Check className="text-xs" aria-label="Oui" />
                                ) : (
                                    <XMark className="text-xs" aria-label="Non" />
                                )}
                            </div>
                            <div className="text-foreground/80">
                                <Markdown source={item} variant="inline" autoLinkTechnologies={false} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function ServicesSection({ services }: { services: ServicePage[] }) {
    return (
        <Section id="services" className="bg-surface">
            <SectionHeader
                title={
                    <span>
                        Des solutions pensées pour <span className="text-primary">votre réussite</span>
                    </span>
                }
                subtitle={<Badge variant="secondary">Nos services</Badge>}
            />
            <CardGrid>
                {services.map((service, index) => (
                    <FadeInWhenVisible key={service.slug} delay={(index % 3) * 0.1} className="flex">
                        <ServiceCard service={service} />
                    </FadeInWhenVisible>
                ))}
            </CardGrid>
            <div className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-2 md:gap-8">
                <FadeInWhenVisible>
                    <ServiceList items={OTHER_SERVICES} supported={true} title="Et aussi" />
                </FadeInWhenVisible>
                <FadeInWhenVisible delay={0.1}>
                    <ServiceList items={NOT_OFFERED} supported={false} title="Ce qu'on ne fait PAS" />
                </FadeInWhenVisible>
            </div>
        </Section>
    )
}

function NumbersSection({ numbers }: { numbers: NumberData[] }) {
    return (
        <Section id="chiffres" className="bg-light border-border dark:bg-background border-t">
            <SectionHeader
                title={
                    <span>
                        Des résultats qui <span className="text-primary">parlent d&#39;eux-mêmes</span>
                    </span>
                }
                subtitle={<Badge variant="secondary">Nos chiffres</Badge>}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {numbers.map((number, key) => (
                    <FadeInWhenVisible key={key} delay={key * 0.1}>
                        <div className="bg-surface dark:bg-surface-elevated border-border rounded-2xl border p-8 text-center shadow-sm">
                            <div className={cn(lato.className, 'text-primary mb-3 text-6xl font-bold')}>
                                {number.value}
                            </div>
                            <h4 className="mb-2 text-2xl font-semibold">{number.unit}</h4>
                            <p className="text-foreground/70 mb-0">{number.text}</p>
                        </div>
                    </FadeInWhenVisible>
                ))}
            </div>
        </Section>
    )
}

export default async function Page() {
    const [clients, projects, clientLinksData, services] = await Promise.all([
        getAllClients(),
        getAllProjects(),
        getClientLinksData(),
        getAllServices(),
    ])
    const numbers = getNumbers(clients.length, projects.length)

    // Convert Map to plain object for serialization
    const clientLinks = Object.fromEntries(clientLinksData)

    // Generate homepage schemas
    const homepageSchemas = [
        generateLocalBusinessSchema(),
        generateWebPageSchema({
            name: "Développement d'applications Web & PHP à Toulouse - SILARHI",
            description:
                "Développement d'applications Web à Toulouse et en France. Donnez vie à vos idées d'applications responsive & mobiles.",
            url: getCanonicalUrl(),
            type: 'WebPage',
        }),
        ...generateServicesSchema(),
    ]

    return (
        <>
            <JsonLd data={homepageSchemas} />
            <HeroSection />
            <PresentationSection />
            <ServicesSection services={services} />
            <MethodologySection />
            <ClientsSection clients={clients} clientLinks={clientLinks} />
            <NumbersSection numbers={numbers} />
        </>
    )
}

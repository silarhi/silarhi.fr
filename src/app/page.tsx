import type { Metadata } from 'next'
import Image from 'next/image'
import React, { Fragment } from 'react'

import CallToAction from '@/components/call-to-action'
import ClientsSection from '@/components/clients-section'
import JsonLd from '@/components/json-ld'
import Markdown from '@/components/markdown'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import FadeInWhenVisible from '@/components/ui/fade-in-when-visible'
import { ArrowRight, Check, Code, XMark, Zap } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import SectionHeader from '@/components/ui/section-header'
import iconProgramming from '@/icons/dev-productivity_5wps.svg'
import coding from '@/icons/floating-cogs.svg'
import iconIdeas from '@/icons/ideas_vn7a.svg'
import iconCloud from '@/icons/maintenance_4unj.svg'
import iconMeeting from '@/icons/meeting_dunc.svg'
import programmingIllustration from '@/icons/programming_65t2.svg'
import { generateLocalBusinessSchema, generateServicesSchema, generateWebPageSchema } from '@/lib/schemas'
import { getAllClients } from '@/utils/client'
import { getTotalEmployeeHours } from '@/utils/employees'
import { cn } from '@/utils/lib'
import { getAllProjects, getClientLinksData } from '@/utils/project'
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

interface Benefit {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    title: string
    description: string
}

interface Service {
    text: string
    supported: boolean
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
            'Nous étudions précisément votre besoin pour éliminer toute zone d’ombre. Vous obtenez une vision claire du projet avant même de commencer.',
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

const BENEFITS: Benefit[] = [
    {
        icon: Code,
        title: 'Code de qualité',
        description:
            "Votre application est construite avec des technologies éprouvées, un code propre et maintenable, conçu pour évoluer avec votre activité.",
    },
    {
        icon: Zap,
        title: 'Livraison efficace',
        description:
            "Des itérations régulières et une communication transparente pour vous garantir une visibilité constante sur l'avancement de votre projet.",
    },
    {
        icon: Check,
        title: 'Partenaire de confiance',
        description:
            "Plus qu'un prestataire : une équipe technique dédiée, engagée dans la réussite durable de vos projets, avec transparence et réactivité.",
    },
]

const SERVICES: Service[] = [
    {
        text: `**Développement d'applications Web** type gestion, CRM, ERP, ...`,
        supported: true,
    },
    {
        text: `**Développement d'applications responsives** (adaptées aux mobiles et tablettes)`,
        supported: true,
    },
    {
        text: `Développement d'applications mobiles natives (iOS, Android)`,
        supported: false,
    },
    {
        text: `Développement spécifique d'API`,
        supported: true,
    },
    {
        text: `Développement de site e-Commerce`,
        supported: false,
    },
    {
        text: `Développement de plugin type Wordpress, Drupal`,
        supported: false,
    },
    {
        text: `Migration de version Symfony`,
        supported: true,
    },
    {
        text: `Migration de version PHP`,
        supported: true,
    },
    {
        text: `Reprise d'application PHP existante`,
        supported: true,
    },
    {
        text: `Gestion de l'infrastructure serveur / cloud`,
        supported: true,
    },
    {
        text: `Mise en place d'intégration continue / déploiement continu`,
        supported: true,
    },
    {
        text: `Intégration de maquette UI / UX`,
        supported: true,
    },
    {
        text: `Audit de sécurité`,
        supported: true,
    },
    {
        text: `Audit SEO`,
        supported: false,
    },
    {
        text: `Webmarketing`,
        supported: false,
    },
    {
        text: `Hébergement de sites Internet`,
        supported: false,
    },
    {
        text: `Création de logos / identité visuelle (en revanche, nous pouvons vous recommander des graphistes)`,
        supported: false,
    },
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
            text: `de développement au service de nos clients`,
        },
        {
            value: clientsCount,
            unit: 'Clients',
            text: `nous font confiance pour leurs projets stratégiques`,
        },
        {
            value: projectsCount,
            unit: 'Projets',
            text: `livrés avec succès depuis notre création`,
        },
    ]
}

function HeroSection({ numbers }: { numbers: NumberData[] }) {
    return (
        <div className="relative overflow-hidden bg-primary-dark text-white">
            {/* Subtle background decoration */}
            <Image
                src={coding}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-5"
                height={160}
                sizes="100vw"
            />
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-primary-dark/60" />

            <Section className="relative z-10 pb-0 pt-32 lg:pt-44">
                <div className="grid items-center gap-8 lg:grid-cols-5 lg:gap-12">
                    {/* Text content — 3 columns */}
                    <div className="lg:col-span-3">
                        <FadeInWhenVisible>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" aria-hidden="true" />
                                Agence Web · Toulouse & France
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.15} duration={0.8} yOffset={30}>
                            <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl xl:text-7xl">
                                Donnez vie à vos
                                <br />
                                <span className="text-secondary">projets Web</span>
                                <br />
                                avec des experts
                            </h1>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.25} duration={0.8} yOffset={30}>
                            <p className="mb-8 text-lg leading-relaxed text-white/80 lg:text-xl">
                                Applications sur mesure, migrations, audits de performance… SILARHI accompagne les
                                entreprises dans la réalisation de leurs projets digitaux, de la conception au
                                déploiement.
                            </p>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.35} duration={0.8} yOffset={30}>
                            <div className="flex flex-wrap gap-4">
                                <Button as="a" href="/contact" size="lg" variant="secondary">
                                    Démarrer mon projet
                                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                                </Button>
                                <Button as="a" href="/projets" size="lg" variant="outline-white">
                                    Voir nos réalisations
                                </Button>
                            </div>
                        </FadeInWhenVisible>
                    </div>

                    {/* Illustration — 2 columns, hidden on mobile */}
                    <div className="hidden justify-center lg:col-span-2 lg:flex">
                        <FadeInWhenVisible delay={0.4} yOffset={40}>
                            <Image
                                src={programmingIllustration}
                                alt="Développement d'applications Web"
                                height={420}
                                priority
                                className="max-w-full drop-shadow-2xl"
                            />
                        </FadeInWhenVisible>
                    </div>
                </div>

                {/* Key stats strip */}
                <div className="mt-12 border-t border-white/15 py-10">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {numbers.map((number, key) => (
                            <FadeInWhenVisible key={key} delay={0.55 + key * 0.1}>
                                <div className="text-center">
                                    <div className={cn(lato.className, 'mb-1 text-5xl font-bold text-secondary')}>
                                        {number.value}
                                    </div>
                                    <div className="mb-1 text-lg font-medium">{number.unit}</div>
                                    <p className="mb-0 text-sm text-white/60">{number.text}</p>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
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

                {/* Main stages */}
                {FEATURES.map((stage, index) => (
                    <Fragment key={index}>
                        {/* Stage with number outside */}
                        <FadeInWhenVisible delay={0.2 + index * 0.15}>
                            <div className={cn('flex items-start gap-3 md:gap-4')}>
                                <div className="bg-surface border-border flex-1 overflow-hidden rounded-xl border shadow-lg transition-transform hover:scale-105">
                                    <div className="p-4 md:p-6">
                                        <div className="flex flex-col items-start gap-4 md:flex-row md:gap-6">
                                            <div className="flex h-32 w-full shrink-0 items-center justify-center md:w-32">
                                                <Image src={stage.icon} sizes="100vw" height={128} alt={stage.title} />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="mb-2 text-lg font-bold md:text-xl">{stage.title}</h3>
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

                {/* Success block - small, only title */}
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

function ServiceList({
    services,
    supported,
    title,
}: {
    services: Service[]
    supported: boolean
    title: React.ReactNode
}) {
    return (
        <>
            <h3 className="text-primary-dark dark:text-primary mb-4 text-2xl font-light">{title}</h3>
            <div className="bg-surface dark:bg-light dark:text-foreground border-border mb-12 rounded-lg border shadow-lg">
                <ul className="">
                    {services.map((service, key) => (
                        <li
                            key={`${key}`}
                            className="border-border flex items-center gap-x-4 border-b px-4 py-3 last:border-0"
                        >
                            <div
                                className={cn('flex size-5 shrink-0 items-center justify-center rounded-full', {
                                    'bg-success/25 text-success': supported,
                                    'bg-error/25 text-error': !supported,
                                })}
                            >
                                {supported ? <Check className="text-xs" /> : <XMark className="text-xs" />}
                            </div>
                            <div className="text-foreground/80">
                                <Markdown source={service.text} variant="inline" autoLinkTechnologies={false} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

function PresentationSection() {
    return (
        <Section id="presentation" className="bg-surface border-border border-t">
            <FadeInWhenVisible>
                <div className="mb-12 text-center">
                    <Badge variant="secondary" className="mb-4">
                        Notre approche
                    </Badge>
                    <h2 className="mb-4 text-4xl font-bold">
                        Un partenaire technique qui comprend <span className="text-primary">vos enjeux</span>
                    </h2>
                    <p className="text-foreground/70 mx-auto max-w-3xl text-xl">
                        SILARHI est une agence spécialisée dans le développement d&apos;applications Web sur mesure en
                        PHP / Symfony. Nous transformons vos besoins métier en solutions digitales robustes et
                        pérennes.
                    </p>
                </div>
            </FadeInWhenVisible>

            <div className="grid gap-8 lg:grid-cols-3">
                {BENEFITS.map((benefit, i) => (
                    <FadeInWhenVisible key={i} delay={0.1 + i * 0.1}>
                        <div className="bg-surface border-border group rounded-xl border p-8 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                            <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                <benefit.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold">{benefit.title}</h3>
                            <p className="text-foreground/70 mb-0">{benefit.description}</p>
                        </div>
                    </FadeInWhenVisible>
                ))}
            </div>
        </Section>
    )
}

function ServicesSection() {
    const supportedServices = SERVICES.filter((service) => service.supported)
    const unsupportedServices = SERVICES.filter((service) => !service.supported)

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
            <div className="mx-auto max-w-4xl">
                <FadeInWhenVisible delay={0.1}>
                    <ServiceList services={supportedServices} supported={true} title="Notre savoir faire" />
                </FadeInWhenVisible>
                <FadeInWhenVisible delay={0.3}>
                    <ServiceList services={unsupportedServices} supported={false} title="Ce qu'on ne fait PAS" />
                </FadeInWhenVisible>
            </div>
        </Section>
    )
}

export default async function Page() {
    const [clients, projects, clientLinksData] = await Promise.all([
        getAllClients(),
        getAllProjects(),
        getClientLinksData(),
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
            <HeroSection numbers={numbers} />
            <PresentationSection />
            <ServicesSection />
            <MethodologySection />
            <ClientsSection clients={clients} clientLinks={clientLinks} />
        </>
    )
}

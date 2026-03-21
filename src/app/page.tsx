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
import iconProcess from '@/icons/creation-process_uvp6.svg'
import iconProgramming from '@/icons/dev-productivity_5wps.svg'
import coding from '@/icons/floating-cogs.svg'
import iconIdeas from '@/icons/ideas_vn7a.svg'
import iconCloud from '@/icons/maintenance_4unj.svg'
import iconMeeting from '@/icons/meeting_dunc.svg'
import { generateLocalBusinessSchema, generateServicesSchema, generateWebPageSchema } from '@/lib/schemas'
import { getAllClients } from '@/utils/client'
import { getTotalEmployeeHours } from '@/utils/employees'
import { cn } from '@/utils/lib'
import { getAllProjects, getClientLinksData } from '@/utils/project'
import { getCanonicalUrl } from '@/utils/url'

import { lato, montserrat } from './fonts'

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
    step: number
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

interface ValueProp {
    icon: React.ReactNode
    title: string
    description: string
}

const VALUE_PROPS: ValueProp[] = [
    {
        icon: <Code className="size-6" />,
        title: 'Code sur mesure',
        description: 'Chaque ligne de code est écrite pour votre projet, pas de template générique.',
    },
    {
        icon: <Zap className="size-6" />,
        title: 'Livraison rapide',
        description: 'Un processus agile et itératif pour des résultats concrets, rapidement.',
    },
    {
        icon: <Check className="size-6" />,
        title: 'Qualité garantie',
        description: 'Tests automatisés, revue de code et intégration continue sur chaque projet.',
    },
]

const FEATURES: Feature[] = [
    {
        icon: iconMeeting,
        title: 'Analyse',
        description:
            'Nous étudions précisément votre besoin pour éliminer toute zone d\u2019ombre. Vous obtenez une vision claire du projet avant même de commencer.',
        step: 1,
    },
    {
        icon: iconIdeas,
        title: 'Conception',
        description:
            'Nous concevons une solution sur mesure, pensée pour durer. Vous démarrez avec un produit pensé pour évoluer facilement.',
        step: 2,
    },
    {
        icon: iconProgramming,
        title: 'Développement',
        description:
            'Nous développons une application Web robuste, moderne et sécurisée. Votre application évolue proprement grâce à un code clair et maintenable.',
        step: 3,
    },
    {
        icon: iconCloud,
        title: 'Déploiement',
        description:
            'Nous assurons un déploiement fluide, sans interruption de votre activité. Votre solution est mise en production avec des outils fiables et automatisés.',
        step: 4,
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

function HeroDecoration() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Top-right gradient blob */}
            <div className="bg-primary/10 dark:bg-primary/5 absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl" />
            {/* Bottom-left gradient blob */}
            <div className="bg-secondary/10 dark:bg-secondary/5 absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl" />
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
                style={{
                    backgroundImage: `radial-gradient(circle, var(--color-primary) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                }}
            />
        </div>
    )
}

function HeroSection() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <HeroDecoration />
            <Section className="relative z-1 pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left: Text content */}
                    <div>
                        <FadeInWhenVisible duration={0.8} yOffset={30}>
                            <Badge variant="secondary" className="mb-6">
                                Agence Web à Toulouse
                            </Badge>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.15} duration={0.8} yOffset={30}>
                            <h1
                                className={cn(
                                    montserrat.className,
                                    'text-foreground mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl'
                                )}
                            >
                                Votre projet Web mérite <span className="text-primary">un code d&apos;exception</span>
                            </h1>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.3} duration={0.8} yOffset={30}>
                            <p className="text-foreground/70 mb-8 max-w-xl text-lg leading-relaxed lg:text-xl">
                                Nous développons des applications Web sur mesure en PHP &amp; Symfony. Du prototype à la
                                production, nous transformons vos idées en solutions performantes.
                            </p>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.45} duration={0.8} yOffset={30}>
                            <div className="flex flex-wrap gap-4">
                                <Button as="a" size="lg" href="/contact">
                                    Démarrer votre projet
                                    <ArrowRight className="size-5" />
                                </Button>
                                <Button as="a" size="lg" href="#services" variant="outline-primary">
                                    Découvrir nos services
                                </Button>
                            </div>
                        </FadeInWhenVisible>
                    </div>

                    {/* Right: Illustration with floating elements */}
                    <div className="relative hidden lg:block">
                        <FadeInWhenVisible delay={0.3} duration={1} yOffset={40}>
                            <div className="relative">
                                {/* Main illustration */}
                                <div className="bg-primary/5 dark:bg-primary/10 flex items-center justify-center rounded-3xl p-8">
                                    <Image
                                        src={iconProcess}
                                        alt="Processus de création"
                                        height={400}
                                        className="h-auto w-full max-w-md"
                                    />
                                </div>
                                {/* Floating accent card top-right */}
                                <div className="bg-surface dark:bg-surface-elevated border-border absolute -top-4 -right-4 rounded-xl border p-4 shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-success/10 text-success flex size-10 items-center justify-center rounded-full">
                                            <Check className="size-5" />
                                        </div>
                                        <div>
                                            <p className="mb-0 text-sm font-semibold">Projet livré</p>
                                            <p className="text-muted mb-0 text-xs">En production</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating accent card bottom-left */}
                                <div className="bg-surface dark:bg-surface-elevated border-border absolute -bottom-4 -left-4 rounded-xl border p-4 shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                                            <Code className="size-5" />
                                        </div>
                                        <div>
                                            <p className="mb-0 text-sm font-semibold">Code maintenable</p>
                                            <p className="text-muted mb-0 text-xs">Tests &amp; CI/CD</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </Section>
        </div>
    )
}

function ValuePropsSection() {
    return (
        <Section className="bg-primary-dark relative z-2 text-white">
            <Image
                src={coding}
                alt="Coding"
                className="absolute top-0 left-0 -z-1 h-full w-full object-cover opacity-5"
                height={160}
                sizes="100vw"
            />
            <div className="grid gap-8 md:grid-cols-3 md:gap-12">
                {VALUE_PROPS.map((prop, index) => (
                    <FadeInWhenVisible key={index} delay={index * 0.15}>
                        <div className="text-center">
                            <div className="bg-surface/10 mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl">
                                {prop.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-bold">{prop.title}</h3>
                            <p className="mb-0 text-white/80">{prop.description}</p>
                        </div>
                    </FadeInWhenVisible>
                ))}
            </div>
        </Section>
    )
}

function PresentationSection() {
    return (
        <Section id="presentation" className="bg-surface border-border border-t">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <FadeInWhenVisible>
                    <div className="relative hidden lg:block">
                        <div className="bg-secondary/5 dark:bg-secondary/10 flex items-center justify-center rounded-3xl p-8">
                            <Image
                                src={iconProgramming}
                                alt="Productivité développement"
                                height={320}
                                className="h-auto w-full max-w-sm"
                            />
                        </div>
                    </div>
                </FadeInWhenVisible>
                <FadeInWhenVisible delay={0.15}>
                    <div>
                        <Badge variant="secondary" className="mb-4">
                            Qui sommes-nous
                        </Badge>
                        <h2 className={cn(montserrat.className, 'mb-6 text-3xl font-bold tracking-tight lg:text-4xl')}>
                            Une agence dédiée à la réalisation d&apos;applications Web{' '}
                            <span className="text-primary">sur mesure</span>
                        </h2>
                        <p className="text-foreground/70 mb-4 text-lg leading-relaxed">
                            Spécialistes de l&apos;écosystème PHP et Symfony, nous accompagnons nos clients de
                            l&apos;idée initiale à la mise en production. Chaque projet bénéficie d&apos;un code propre,
                            testé et conçu pour durer.
                        </p>
                        <p className="text-foreground/70 text-lg leading-relaxed">
                            Que vous ayez besoin de créer une application de A à Z ou de reprendre un projet existant,
                            nous mettons notre expertise technique au service de votre réussite.
                        </p>
                    </div>
                </FadeInWhenVisible>
            </div>
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
                    <span className={montserrat.className}>
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
                                <div className="bg-surface border-border flex-1 overflow-hidden rounded-xl border shadow-lg transition-transform hover:scale-105">
                                    <div className="p-4 md:p-6">
                                        <div className="flex flex-col items-start gap-4 md:flex-row md:gap-6">
                                            <div className="flex h-32 w-full shrink-0 items-center justify-center md:w-32">
                                                <Image src={stage.icon} sizes="100vw" height={128} alt={stage.title} />
                                            </div>

                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <span className="bg-primary/10 text-primary flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                                                        {stage.step}
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

function ServicesSection() {
    const supportedServices = SERVICES.filter((service) => service.supported)
    const unsupportedServices = SERVICES.filter((service) => !service.supported)

    return (
        <Section id="services" className="bg-surface">
            <SectionHeader
                title={
                    <span className={montserrat.className}>
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

function NumbersSection({ numbers }: { numbers: NumberData[] }) {
    return (
        <Section id="chiffres" className="bg-light border-border dark:bg-background border-t">
            <SectionHeader
                title={
                    <span className={montserrat.className}>
                        Des résultats qui <span className="text-primary">parlent d&#39;eux-mêmes</span>
                    </span>
                }
                subtitle={<Badge variant="secondary">Nos chiffres</Badge>}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {numbers.map((number, key) => (
                    <FadeInWhenVisible key={key} delay={key * 0.1}>
                        <div className="bg-surface dark:bg-surface-elevated border-border rounded-2xl border p-8 text-center shadow-sm transition-shadow hover:shadow-md">
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
            <HeroSection />
            <ValuePropsSection />
            <PresentationSection />
            <ServicesSection />
            <MethodologySection />
            <ClientsSection clients={clients} clientLinks={clientLinks} />
            <NumbersSection numbers={numbers} />
        </>
    )
}

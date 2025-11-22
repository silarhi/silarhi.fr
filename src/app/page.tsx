import type { Metadata } from 'next'
import Image from 'next/image'
import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'

import CallToAction from '@/components/call-to-action'
import ClientsSection from '@/components/clients-section'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import FadeInWhenVisible from '@/components/ui/fade-in-when-visible'
import { Check, XMark } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import SectionHeader from '@/components/ui/section-header'
import iconProgramming from '@/icons/dev-productivity_5wps.svg'
import coding from '@/icons/floating-cogs.svg'
import iconIdeas from '@/icons/ideas_vn7a.svg'
import iconCloud from '@/icons/maintenance_4unj.svg'
import iconMeeting from '@/icons/meeting_dunc.svg'
import home from '@/public/images/home.jpg'
import { getAllClients } from '@/utils/client'
import { getTotalEmployeeHours } from '@/utils/employees'
import { cn } from '@/utils/lib'
import { getAllProjects } from '@/utils/project'

import { lato } from './fonts'

export const metadata: Metadata = {
    title: `Développement d'applications Web & PHP à Toulouse - SILARHI`,
    description: `Développement d'applications Web à Toulouse et en France. Donnez vie à vos idées d'applications responsive & mobiles. Devis rapide et gratuit.`,
}

interface Feature {
    icon: string
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

function HeroSection() {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div className="absolute top-0 left-0 z-[1] h-full w-full bg-black opacity-60"></div>
            <Image
                src={home}
                sizes="100vw"
                fill
                style={{ objectFit: 'cover' }}
                priority
                alt="SILARHI, Agence de développement Web Toulouse"
            />
            <div className="text-surface absolute z-[2] flex h-full w-full flex-col items-center justify-center">
                <Section>
                    <div className="mx-auto max-w-4xl">
                        <FadeInWhenVisible duration={0.8} yOffset={30}>
                            <h1 className="text-5xl font-bold text-shadow-lg lg:text-6xl xl:text-7xl">
                                Développement d&apos;applications Web
                                <br />
                                <Badge variant="secondary" className="text-foreground bg-secondary/80">
                                    À Toulouse & en France
                                </Badge>
                            </h1>
                        </FadeInWhenVisible>
                        <FadeInWhenVisible delay={0.3} duration={0.8} yOffset={30}>
                            <h2 className="mt-4 text-3xl uppercase text-shadow-lg">
                                Transformez vos ambitions digitales en <span className="text-primary">réalité</span>
                            </h2>
                        </FadeInWhenVisible>
                        <FadeInWhenVisible delay={0.5} duration={0.8} yOffset={30}>
                            <Button as="a" size="lg" href="#presentation" className="mt-4 lg:mt-6">
                                En savoir plus
                            </Button>
                        </FadeInWhenVisible>
                    </div>
                </Section>
            </div>
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
                        <span className="bg-primary-light/10 border-primary/10 inline-block rounded-lg border-2 p-3 md:p-4">
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
                                            <div className="flex h-32 w-full flex-shrink-0 items-center justify-center md:w-32">
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
                        <span className="bg-success/10 border-success/10 inline-block rounded-lg border-2 p-3 md:p-4">
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
            <h3 className="text-primary-dark mb-4 text-2xl font-light">{title}</h3>
            <div className="bg-surface border-border mb-12 rounded-lg border shadow-lg">
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
                                <ReactMarkdown
                                    components={{
                                        p: ({ children }) => <>{children}</>,
                                    }}
                                >
                                    {service.text}
                                </ReactMarkdown>
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
        <Section id="presentation" className="bg-primary-dark relative z-[2]">
            <Image
                src={coding}
                alt="Coding"
                className="absolute top-0 left-0 -z-1 h-full w-full object-cover opacity-5"
                height={160}
                sizes="100vw"
            />
            <FadeInWhenVisible>
                <div className="text-surface mx-auto max-w-4xl text-center">
                    <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                        SILARHI est une agence de développement spécialisée dans la réalisation d&apos;applications Web
                        sur mesure.
                    </h2>
                    <p className="text-lg">
                        Spécialistes de l&apos;écosystème PHP, nous développons ou reprennons vos projets en Symfony, du
                        prototype à la mise en ligne.
                    </p>
                </div>
            </FadeInWhenVisible>
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

function NumbersSection({ numbers }: { numbers: NumberData[] }) {
    return (
        <Section id="chiffres" className="bg-light border-border border-t">
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
                        <div className="text-center">
                            <div className={cn(lato.className, 'text-secondary mb-3 text-6xl font-bold')}>
                                {number.value}
                            </div>
                            <h4 className="mb-0 text-2xl font-light lg:mb-3">{number.unit}</h4>
                            <p className="text-foreground/80">{number.text}</p>
                        </div>
                    </FadeInWhenVisible>
                ))}
            </div>
        </Section>
    )
}

export default async function Page() {
    const [clients, projects] = await Promise.all([getAllClients(), getAllProjects()])
    const numbers = getNumbers(clients.length, projects.length)

    return (
        <>
            <HeroSection />
            <PresentationSection />
            <ServicesSection />
            <MethodologySection />
            <ClientsSection clients={clients} projects={projects} />
            <NumbersSection numbers={numbers} />
        </>
    )
}

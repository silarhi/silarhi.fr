import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'

import Button from '@/components/button'
import CallToAction from '@/components/call-to-action'
import FadeInWhenVisible from '@/components/fade-in-when-visible'
import { Check, XMark } from '@/components/icons'
import Section from '@/components/section'
import SectionHeader from '@/components/section-header'
import iconProgramming from '@/icons/dev-productivity_5wps.svg'
import coding from '@/icons/floating-cogs.svg'
import iconIdeas from '@/icons/ideas_vn7a.svg'
import iconCloud from '@/icons/maintenance_4unj.svg'
import iconMeeting from '@/icons/meeting_dunc.svg'
import home from '@/public/images/home.jpg'
import { getDaysSince } from '@/utils/dates'
import { getTotalEmployeeCoffees, getTotalEmployeeHours } from '@/utils/employees'
import { cn } from '@/utils/lib'

import { lato } from './fonts'

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
    value: number
    unit: string
    text: string
}

const FEATURES: Feature[] = [
    {
        icon: iconMeeting,
        title: 'Analyse',
        description:
            "On vous aide à spécifier votre projet si vous en avez besoin. On peut également vous guider dans l'étude de la faisabilité technique.",
    },
    {
        icon: iconIdeas,
        title: 'Conception',
        description: 'On vous présente la façon de mener à bien votre projet !',
    },
    {
        icon: iconProgramming,
        title: 'Développement',
        description:
            'On donne vie à votre idée. Vous intervenez à chaque étape majeure du développement pour confirmer la trajectoire du projet.',
    },
    {
        icon: iconCloud,
        title: 'Déploiement',
        description:
            "L'application est hébergée sur l'infrastructure de votre choix. Intranet, OVH, AWS, GCP, on s'adapte, et si tous ces sigles ne vous disent rien, laissez-vous guider !",
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
const DAYS_SINCE_COMPANY_START_DATE = getDaysSince(COMPANY_START_DATE)

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

const NB_CLIENTS = 11
const NB_PROJECTS = 109

const NUMBERS: NumberData[] = [
    {
        value: getTotalEmployeeHours(EMPLOYEES),
        unit: 'Heures',
        text: `passées à travailler sur les projets de nos clients.`,
    },
    {
        value: NB_CLIENTS,
        unit: 'Clients',
        text: `Et 100% de satisfaction au cours de ces ${Math.trunc(
            DAYS_SINCE_COMPANY_START_DATE / 365
        )} années. Venez vérifier par vous-même !`,
    },
    {
        value: NB_PROJECTS,
        unit: 'Projets',
        text: `Plus de ${Math.trunc(
            NB_PROJECTS / NB_CLIENTS
        )} projets par client en moyenne, signe de la relation de confiance établie.`,
    },
    {
        value: getTotalEmployeeCoffees(EMPLOYEES),
        unit: 'Cafés',
        text: `Être toujours à votre écoute et force de proposition, telle est notre mission !`,
    },
]

function HeroSection() {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div className="absolute top-0 left-0 z-[1] h-full w-full bg-black opacity-45"></div>
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
                    <div style={{ maxWidth: '55em' }} className="mx-auto">
                        <FadeInWhenVisible duration={0.8} yOffset={30}>
                            <h1 className="text-5xl leading-none font-bold xl:text-7xl">
                                Développement d&apos;applications Web
                                <span className="mt-3 block text-3xl uppercase lg:text-5xl">
                                    À Toulouse & en France
                                </span>
                            </h1>
                        </FadeInWhenVisible>
                        <FadeInWhenVisible delay={0.3} duration={0.8} yOffset={30}>
                            <h2 className="mt-4 text-3xl font-light uppercase">Donnez vie à vos idées</h2>
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
            <div className="relative h-6 w-0.5 bg-slate-300 md:h-10">
                <div className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-t-8 border-r-4 border-l-4 border-t-slate-300 border-r-transparent border-l-transparent"></div>
            </div>
        </div>
    )
}

function MethodologySection() {
    return (
        <Section id="methodologie" className="bg-surface">
            <SectionHeader
                title="On développe des applications Web pour donner vie à vos projets"
                subtitle="Et ça se passe comme ça."
            />

            <div className="mx-auto my-12 max-w-[40rem] space-y-1">
                <FadeInWhenVisible delay={0.1}>
                    <div className="text-center">
                        <span className="bg-primary-light/10 border-primary/10 inline-block rounded-lg border-2 p-3 md:p-4">
                            <h3 className="text-base font-bold md:text-lg">Prise de contact / devis</h3>
                        </span>
                    </div>
                </FadeInWhenVisible>

                <Arrow />

                {/* Main stages */}
                {FEATURES.map((stage, index) => (
                    <Fragment key={index}>
                        {/* Stage with number outside */}
                        <FadeInWhenVisible delay={0.2 + index * 0.15}>
                            <div className={cn('flex items-start gap-3 md:gap-4')}>
                                <div className="bg-surface border-border flex-1 overflow-hidden rounded-lg border shadow-xl transition-transform hover:scale-[1.05]">
                                    <div className="p-4 md:p-6">
                                        <div className="flex flex-col items-start gap-4 md:flex-row md:gap-6">
                                            <div className="flex h-32 w-full flex-shrink-0 items-center justify-center md:w-32">
                                                <Image src={stage.icon} sizes="100vw" height={128} alt={stage.title} />
                                            </div>

                                            <div className="flex-1">
                                                <h2 className="mb-2 text-lg font-bold md:text-xl">{stage.title}</h2>
                                                <p className="text-muted">{stage.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        {index < FEATURES.length - 1 && <Arrow />}
                    </Fragment>
                ))}

                <Arrow />

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

function ServiceList({ services, supported }: { services: Service[]; supported: boolean }) {
    return (
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
                        <div className="text-muted">
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
                <div className="text-surface mx-auto max-w-[55rem] text-center">
                    <h3 className="mb-4 text-3xl">
                        SILARHI est une agence de développement spécialisée dans la réalisation d&apos;applications Web
                        sur mesure.
                    </h3>
                    <p className="text-lg">
                        Spécialistes de l&apos;écosystème PHP, nous développons vos projets en Symfony, du prototype à
                        la mise en ligne.
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
        <Section id="services">
            <SectionHeader title="Nos services" subtitle="Vérifiez que votre besoin colle avec notre savoir faire." />
            <div className="mx-auto max-w-[55rem]">
                <FadeInWhenVisible delay={0.1}>
                    <h3 className="text-primary-dark text-2xl font-light">Notre savoir faire</h3>
                </FadeInWhenVisible>
                <FadeInWhenVisible delay={0.2}>
                    <ServiceList services={supportedServices} supported={true} />
                </FadeInWhenVisible>
                <FadeInWhenVisible delay={0.3}>
                    <h3 className="text-primary-dark text-2xl font-light">Ce qu&apos;on ne fait PAS</h3>
                </FadeInWhenVisible>
                <FadeInWhenVisible delay={0.4}>
                    <ServiceList services={unsupportedServices} supported={false} />
                </FadeInWhenVisible>
                <CallToAction />
            </div>
        </Section>
    )
}

function NumbersSection() {
    return (
        <Section id="chiffres">
            <SectionHeader title="Les chiffres" subtitle="Quelques chiffres de cette agence fondée en 2018." />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {NUMBERS.map((number, key) => (
                    <FadeInWhenVisible key={key} delay={key * 0.1}>
                        <div className="text-center">
                            <div className={cn(lato.className, 'text-secondary mb-3 text-6xl font-bold')}>
                                {number.value}
                            </div>
                            <h4 className="mb-0 text-2xl font-light lg:mb-3">{number.unit}</h4>
                            <p className="text-muted">{number.text}</p>
                        </div>
                    </FadeInWhenVisible>
                ))}
            </div>
            <CallToAction />
        </Section>
    )
}

export default function Page() {
    return (
        <>
            <Head>
                <title>{`Développement d'applications Web & PHP à Toulouse - SILARHI`}</title>
            </Head>
            <HeroSection />
            <PresentationSection />
            <ServicesSection />
            <MethodologySection />
            <NumbersSection />
        </>
    )
}

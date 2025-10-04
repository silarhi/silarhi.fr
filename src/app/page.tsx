'use client'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment, ReactNode, useCallback, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import Button from '@/components/Button'
import CallToAction from '@/components/CallToAction'
import ContactForm from '@/components/ContactForm'
import {
    Check,
    Clock,
    CloudBolt,
    Code,
    Enveloppe,
    FileContract,
    LightBulb,
    Map,
    Phone,
    XMark,
} from '@/components/Icons'
import IconWrapper from '@/components/IconWrapper'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import useForceReducer from '@/hooks/reducer'
import { chunk } from '@/utils/array'
import { getDaysSince } from '@/utils/dates'
import { getTotalEmployeeCoffees, getTotalEmployeeHours } from '@/utils/employees'

import home from '../../public/images/home.jpg'
import { lato } from './fonts'
import styles from './index.module.scss'

interface Feature {
    icon: () => ReactNode
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
        icon: () => <FileContract />,
        title: 'Analyse',
        description:
            "On vous aide à spécifier votre projet si vous en avez besoin. On peut également vous guider dans l'étude de la faisabilité technique.",
    },
    {
        icon: () => <LightBulb />,
        title: 'Conception',
        description: 'On vous présente la façon de mener à bien votre projet !',
    },
    {
        icon: () => <Code />,
        title: 'Développement',
        description:
            'On donne vie à votre idée. Vous intervenez à chaque étape majeure du développement pour confirmer la trajectoire du projet.',
    },
    {
        icon: () => <CloudBolt />,
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
        text: `**Développement d'applications mobiles** / responsives`,
        supported: true,
    },
    {
        text: `Développement spécifique d'API`,
        supported: true,
    },
    {
        text: `Pont de communication entre applications existantes`,
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
        text: `Upgrade de version Symfony`,
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
        text: `Intégration de maquette`,
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

export default function Page() {
    const { value: formIdValue, updateValue: forceIsFormSubmitted, resetValue: resetFormSubmitted } = useForceReducer()
    const [showSendButton, setShowSendButton] = useState<boolean>(true)
    const [isFormPending, setIsFormPending] = useState<boolean>(false)

    const onPending = useCallback(() => {
        setIsFormPending(true)
    }, [setIsFormPending])

    const onFinish = useCallback(() => {
        setShowSendButton(false)
        resetFormSubmitted()
    }, [setShowSendButton, resetFormSubmitted])

    // We store title in variable because of ' special chars which render multiple children
    const title = `Développement d'applications Web & PHP à Toulouse - SILARHI`

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {/* Header */}
            <div className={styles.bgWrap}>
                <div className={styles.backdrop}></div>
                <Image src={home} sizes="100vw" fill style={{ objectFit: 'cover' }} priority alt="" />
                <div className={styles.contentWrapper}>
                    <Section>
                        <div style={{ maxWidth: '55em' }} className={'mx-auto'}>
                            <h1>
                                Développement d{"'"}applications Web
                                <span>À Toulouse & en France</span>
                            </h1>
                            <h2 className="uppercase font-light">Donnez vie à vos idées</h2>
                            <Button as="a" size="lg" href="#about" className="mt-4">
                                En savoir plus
                            </Button>
                        </div>
                    </Section>
                </div>
            </div>
            {/* About */}
            <Section id={'about'}>
                <SectionHeader title="On développe des applications Web" subtitle="Et ça se passe comme ça." />
                <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                    {FEATURES.map((feature, key) => (
                        <div key={key} className="w-full">
                            <div className="bg-white shadow rounded-lg mb-4 text-center p-6">
                                <div>
                                    <IconWrapper>{feature.icon()}</IconWrapper>
                                    <h3 className="text-xl font-bold my-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <CallToAction />
            </Section>
            {/* Services */}
            <Section id={'services'} className={'bg-white'}>
                <SectionHeader
                    title="Nos services"
                    subtitle="Vérifiez que votre besoin colle avec notre savoir faire."
                />
                <h3 className="text-xl text-primary font-light">Notre savoir faire</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                    {chunk(
                        SERVICES.filter((service) => service.supported),
                        2
                    ).map((services, chunkKey) => (
                        <div key={chunkKey}>
                            <ul className="space-y-0">
                                {services.map((service, key) => (
                                    <li
                                        key={`${chunkKey}-${key}`}
                                        className="flex items-center py-3 border-b border-gray-200"
                                    >
                                        <div className="mr-4">
                                            <Check className="text-2xl text-sub-primary" />
                                        </div>
                                        <div className="text-gray-600">
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
                    ))}
                </div>
                <h3 className="text-xl text-primary font-light">Ce qu{"'"}on ne fait PAS</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                    {chunk(
                        SERVICES.filter((service) => !service.supported),
                        2
                    ).map((services, chunkKey) => (
                        <div key={chunkKey}>
                            <ul className="space-y-0">
                                {services.map((service, key) => (
                                    <li
                                        key={`${chunkKey}-${key}`}
                                        className="flex items-center py-3 border-b border-gray-200"
                                    >
                                        <div className="mr-4">
                                            <XMark className="text-2xl text-sub-primary" />
                                        </div>
                                        <div className="text-gray-600">
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
                    ))}
                </div>
                <CallToAction />
            </Section>
            {/* Chiffres */}
            <Section id={'chiffres'}>
                <SectionHeader
                    title="Les chiffres"
                    subtitle="Quelques chiffres de cette jeune entreprise fondée en 2018."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {NUMBERS.map((number, key) => (
                        <div key={key} className="text-center">
                            <div className={`${lato.className} text-sub-primary text-6xl font-bold mb-3`}>
                                {number.value}
                            </div>
                            <h4 className="text-primary font-light mb-3">{number.unit}</h4>
                            <hr style={{ width: '40%' }} className="mx-auto" />
                            <p className="text-gray-600">{number.text}</p>
                        </div>
                    ))}
                </div>
                <CallToAction />
            </Section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Contact */}
                <div className="bg-white">
                    <Section id="contact" className="md:pr-3 lg:pr-4 xl:pr-5" paddingX={false} container={false}>
                        <div className="container container-half-md md:mr-0">
                            <h2>Contact</h2>
                            <p className="text-gray-600">
                                Laissez-nous un message et nous vous répondrons dans les plus brefs délais.
                            </p>
                            <ContactForm onFinish={onFinish} onPending={onPending} isSubmitted={formIdValue > 0} />
                            {showSendButton && (
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="mt-4 w-full"
                                    onClick={() => forceIsFormSubmitted()}
                                    disabled={isFormPending}
                                >
                                    Envoyer
                                </Button>
                            )}
                        </div>
                    </Section>
                </div>
                {/* SILARHI */}
                <div className={styles.bgLight2}>
                    <Section id="silarhi" className="md:pl-3 lg:pl-4 xl:pl-5" paddingX={false} container={false}>
                        <div className="container container-half-md md:ml-0">
                            <h2>SILARHI</h2>
                            <p className="text-gray-600">Les infos pratiques, c{"'"}est ici.</p>
                            <ul className="space-y-0">
                                <li className="flex flex-nowrap py-3 border-b border-gray-200">
                                    <span className="mr-1 md:mr-2 lg:mr-3 text-primary">
                                        <Map />
                                    </span>
                                    <span className="text-gray-600">
                                        116 Route d{"'"}Espagne
                                        <br />
                                        HELIOPOLIS 4<br />
                                        BAT 113
                                        <br />
                                        31100 Toulouse
                                    </span>
                                </li>
                                <li className="flex flex-nowrap py-3 border-b border-gray-200">
                                    <span className="mr-1 md:mr-2 lg:mr-3 text-primary">
                                        <Clock />
                                    </span>
                                    <span className="text-gray-600">
                                        Du lundi au vendredi
                                        <br />
                                        De 9h à 18h
                                    </span>
                                </li>
                                <li className="flex flex-nowrap py-3 border-b border-gray-200">
                                    <span className="mr-1 md:mr-2 lg:mr-3 text-primary">
                                        <Phone />
                                    </span>
                                    <span className="text-gray-600">
                                        <a href="tel:+33607275826">0 607.275.826</a>
                                    </span>
                                </li>
                                <li className="flex flex-nowrap py-3 border-b border-gray-200">
                                    <span className="mr-1 md:mr-2 lg:mr-3 text-primary">
                                        <Enveloppe />
                                    </span>
                                    <span className="text-gray-600">
                                        <a href="mailto:%68ell%6F@si%6Ca%72hi.fr">hello@silarhi.fr</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Section>
                </div>
            </div>
        </>
    )
}

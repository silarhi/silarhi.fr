'use client'
import CallToAction from 'components/CallToAction'
import ContactForm from 'components/ContactForm'
import { Check, Clock, CloudBolt, Code, Enveloppe, FileContract, LightBulb, Map, Phone, XMark } from 'components/Icons'
import IconWrapper from 'components/IconWrapper'
import Section from 'components/Section'
import SectionHeader from 'components/SectionHeader'
import useForceReducer from 'hooks/reducer'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment, useCallback, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ReactMarkdown from 'react-markdown'
import { chunk } from 'utils/array'
import { getDaysSince } from 'utils/dates'
import { getTotalEmployeeCoffees, getTotalEmployeeHours } from 'utils/employees'

import home from '../../public/images/home.jpg'
import { lato } from './fonts'
import styles from './index.module.scss'

const FEATURES = [
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

const SERVICES = [
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

const EMPLOYEES = [
    {
        name: 'Guillaume',
        from: new Date(COMPANY_START_DATE),
        coffeesPerDay: 3,
        hoursPerDay: 9,
    },
    {
        name: 'Florian',
        from: new Date('2020-09-01'),
        coffeesPerDay: 0,
        hoursPerDay: 7,
    },
    {
        name: 'Rémy',
        from: new Date('2022-01-01'),
        coffeesPerDay: 4,
        hoursPerDay: 8,
    },
    {
        name: 'Maxime',
        from: new Date('2022-11-02'),
        coffeesPerDay: 3,
        hoursPerDay: 8,
    },
]

const NB_CLIENTS = 10
const NB_PROJECTS = 83

const NUMBERS = [
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
    const {
        value: isFormSubmitted,
        updateValue: forceIsFormSubmitted,
        resetValue: resetFormSubmitted,
    } = useForceReducer()
    const [showSendButton, setShowSendButton] = useState(true)
    const [isFormPending, setIsFormPending] = useState(false)

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
                            <h2 className={'text-uppercase fw-light'}>Donnez vie à vos idées</h2>
                            <Button as={'a'} size={'lg'} href={'#about'} className={'mt-4'}>
                                En savoir plus
                            </Button>
                        </div>
                    </Section>
                </div>
            </div>
            {/* About */}
            <Section id={'about'}>
                <SectionHeader title="On développe des applications Web" subtitle="Et ça se passe comme ça." />
                <Row className={'gx-5 row-cards row-deck'}>
                    {FEATURES.map((feature, key) => (
                        <Col xs={12} lg={4} xl={3} key={key}>
                            <div className={`card shadow mb-4 text-center rounded-4`}>
                                <div className={'card-body'}>
                                    <IconWrapper>{feature.icon()}</IconWrapper>
                                    <h3 className={'card-title h4 fw-bold my-3'}>{feature.title}</h3>
                                    <p className={'card-text text-muted'}>{feature.description}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
                <CallToAction />
            </Section>
            {/* Services */}
            <Section id={'services'} className={'bg-white'}>
                <SectionHeader
                    title="Nos services"
                    subtitle="Vérifiez que votre besoin colle avec notre savoir faire."
                />
                <h3 className={'h4 text-primary fw-light'}>Notre savoir faire</h3>
                <Row className="g-lg-5 mb-5">
                    {chunk(
                        SERVICES.filter((service) => service.supported),
                        2
                    ).map((services, chunkKey) => (
                        <Col lg={6} key={chunkKey}>
                            <ul className="list-group list-group-flush">
                                {services.map((service, key) => (
                                    <li
                                        key={`${chunkKey}-${key}`}
                                        className="list-group-item d-flex align-items-center"
                                    >
                                        <div className="me-4">
                                            <Check className="fa-2x text-sub-primary" />
                                        </div>
                                        <div className={'text-muted'}>
                                            <ReactMarkdown
                                                components={{
                                                    p: Fragment,
                                                }}
                                            >
                                                {service.text}
                                            </ReactMarkdown>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    ))}
                </Row>
                <h3 className={'h4 text-primary fw-light'}>Ce qu{"'"}on ne fait PAS</h3>
                <Row className="g-lg-5 mb-5">
                    {chunk(
                        SERVICES.filter((service) => !service.supported),
                        2
                    ).map((services, chunkKey) => (
                        <Col lg={6} key={chunkKey}>
                            <ul className="list-group list-group-flush">
                                {services.map((service, key) => (
                                    <li
                                        key={`${chunkKey}-${key}`}
                                        className="list-group-item d-flex align-items-center"
                                    >
                                        <div className="me-4">
                                            <XMark className="fa-2x text-sub-primary" />
                                        </div>
                                        <div className={'text-muted'}>
                                            <ReactMarkdown
                                                components={{
                                                    p: Fragment,
                                                }}
                                            >
                                                {service.text}
                                            </ReactMarkdown>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    ))}
                </Row>
                <CallToAction />
            </Section>
            {/* Chiffres */}
            <Section id={'chiffres'}>
                <SectionHeader
                    title="Les chiffres"
                    subtitle="Quelques chiffres de cette jeune entreprise fondée en 2018."
                />
                <Row className="g-lg-5">
                    {NUMBERS.map((number, key) => (
                        <Col md={6} lg={3} key={key} className={'text-center'}>
                            <div className={`${lato.className} text-sub-primary display-1 fw-bold mb-3`}>
                                {number.value}
                            </div>
                            <h4 className="text-primary fw-light mb-3">{number.unit}</h4>
                            <hr style={{ width: '40%' }} className={'mx-auto'} />
                            <p className="text-muted">{number.text}</p>
                        </Col>
                    ))}
                </Row>
                <CallToAction />
            </Section>
            <Row className="g-0">
                {/* Contact */}
                <Col md={6} className={'bg-white'}>
                    <Section id={'contact'} className={'pe-md-3 pe-lg-4 pe-xl-5'} paddingX={false} container={false}>
                        <div className={'container container-half-md me-md-0'}>
                            <h2>Contact</h2>
                            <p className={'text-muted'}>
                                Laissez-nous un message et nous vous répondrons dans les plus brefs délais.
                            </p>
                            <ContactForm onFinish={onFinish} onPending={onPending} isSubmitted={isFormSubmitted} />
                            {showSendButton && (
                                <Button
                                    variant={'primary'}
                                    size={'lg'}
                                    className={'mt-4 btn-block'}
                                    onClick={() => forceIsFormSubmitted()}
                                    disabled={isFormPending}
                                >
                                    Envoyer
                                </Button>
                            )}
                        </div>
                    </Section>
                </Col>
                {/* SILARHI */}
                <Col md={6} className={styles.bgLight2}>
                    <Section id={'silarhi'} className={'ps-md-3 ps-lg-4 ps-xl-5'} paddingX={false} container={false}>
                        <div className={'container container-half-md ms-md-0'}>
                            <h2>SILARHI</h2>
                            <p className={'text-muted'}>Les infos pratiques, c{"'"}est ici.</p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex flex-nowrap">
                                    <span className={'me-1 me-md-2 me-lg-3 text-primary'}>
                                        <Map />
                                    </span>
                                    <span className={'text-muted'}>
                                        116 Route d{"'"}Espagne
                                        <br />
                                        HELIOPOLIS 4<br />
                                        BAT 113
                                        <br />
                                        31100 Toulouse
                                    </span>
                                </li>
                                <li className="list-group-item d-flex flex-nowrap">
                                    <span className={'me-1 me-md-2 me-lg-3 text-primary'}>
                                        <Clock />
                                    </span>
                                    <span className={'text-muted'}>
                                        Du lundi au vendredi
                                        <br />
                                        De 9h à 18h
                                    </span>
                                </li>
                                <li className="list-group-item d-flex flex-nowrap">
                                    <span className={'me-1 me-md-2 me-lg-3 text-primary'}>
                                        <Phone />
                                    </span>
                                    <span className={'text-muted'}>
                                        <a href="tel:+33607275826">0 607.275.826</a>
                                    </span>
                                </li>
                                <li className="list-group-item d-flex flex-nowrap">
                                    <span className={'me-1 me-md-2 me-lg-3 text-primary'}>
                                        <Enveloppe />
                                    </span>
                                    <span className={'text-muted'}>
                                        <a href="mailto:%68ell%6F@si%6Ca%72hi.fr">hello@silarhi.fr</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Section>
                </Col>
            </Row>
        </>
    )
}

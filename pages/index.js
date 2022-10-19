import cx from "classnames"
import CallToAction from "components/CallToAction/CallToAction"
import {Check, CloudBolt, Code, LightBulb, MagnifyingGlass, XMark} from "components/Icons/Icons"
import IconWrapper from "components/IconWrapper/IconWrapper"
import Section from "components/Section/Section"
import SectionHeader from "components/SectionHeader/SectionHeader"
import Markdown from "marked-react"
import Image from "next/future/image"
import Head from "next/head"
import home from 'public/images/home.jpg'
import {useCallback, useReducer, useRef, useState} from "react"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import {chunk} from "utils/array"

import ContactForm from "../components/ContactForm/ContactForm"
import useForceReducer from "../hooks/reducer"
import styles from './index.module.scss'

const FEATURES = [
  {
    icon: () => <MagnifyingGlass />,
    title: 'Analyse',
    description: 'On vous aide à spécifier votre projet si vous en avez besoin. On peut également vous guider dans l\'étude de la faisabilité technique.',
  },
  {
    icon: () => <LightBulb />,
    title: 'Conception',
    description: 'On vous présente la façon de mener à bien votre projet !',
  },
  {
    icon: () => <Code />,
    title: 'Développement',
    description: 'On donne vie à votre idée. Vous intervenez dans chaque étape majeure du développement pour confirmer la trajectoire.',
  },
  {
    icon: () => <CloudBolt />,
    title: 'Déploiement',
    description: 'L\'application est hébergée sur l\'infrastructure de votre choix. OVH, AWS, GCP, si tous ces sigles ne vous disent rien, laissez-vous guider !',
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
    text: `Développement d'API`,
    supported: true,
  },
  {
    text: `Pont de communication entre applications existantes`,
    supported: true,
  },
  {
    text: `Développement de site e-Commerce`,
    supported: true,
  },
  {
    text: `Développement de plugin (Wordpress, Drupal)`,
    supported: true,
  },
  {
    text: `Upgrade de version Symfony`,
    supported: true,
  },
  {
    text: `Gestion de l'infrastructure serveur / cloud`,
    supported: true,
  },
  {
    text: `Mise en place d'intégration continue`,
    supported: true,
  },
  {
    text: `Mise en place de déploiement continu`,
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
    supported: true,
  },
  {
    text: `Webmarketing`,
    supported: true,
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
const DAYS_SINCE_COMPANY_START_DATE = Math.ceil((new Date().getTime() - COMPANY_START_DATE.getTime()) / (1000 * 3600 * 24))

const NUMBERS = [
  {
    value: DAYS_SINCE_COMPANY_START_DATE,
    unit: 'Jours',
    text: `${Math.trunc(DAYS_SINCE_COMPANY_START_DATE / 365)} années extraordinaires, de jolis projets pour des clients formidables.`,
  },
  {
    value: 10,
    unit: 'Clients',
    text: `Et 100% de satisfaction. Venez vérifier par vous-même !`,
  },
  {
    value: 83,
    unit: 'Projets',
    text: `Plus de 8 projets par client en moyenne, signe de la relation de confiance établie.`,
  },
  {
    value: DAYS_SINCE_COMPANY_START_DATE * 3,
    unit: 'Cafés',
    text: `Être toujours à votre écoute et force de proposition, telle est notre mission !`,
  },
]

export default function Home() {
  const {
    value: isFormSubmitted,
    updateValue: forceIsFormSubmitted,
    resetValue: resetFormSubmitted
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

  return (
    <>
      <Head>
        <title>Développement d{"'"}applications Web & PHP à Toulouse - Silarhi</title>
      </Head>
      {/* Header */}
      <div className={styles.bgWrap}>
        <div className={styles.backdrop}></div>
        <Image src={home} sizes="100vw" fill style={{objectFit: 'cover'}} priority alt="" />
        <div className={styles.contentWrapper}>
          <Container>
            <div style={{maxWidth: '55em'}} className={"mx-auto"}>
              <h1>
                Développement d{"'"}applications Web
                <span>À Toulouse & en France</span>
              </h1>
              <h2 className={"text-uppercase fw-light"}>Donnez vie à vos idées</h2>
              <Button as={"a"} size={"lg"} href={"#about"} className={"mt-4"}>En savoir plus</Button>
            </div>
          </Container>
        </div>
      </div>
      {/* About */}
      <Section id={"about"}>
        <SectionHeader
          title="On développe des applications Web"
          subtitle="Et ça se passe comme ça"
        />
        <Row className={"row-cards row-deck"}>
          {FEATURES.map((feature, key) => (
            <Col xs={12} lg={4} xl={3} key={key}>
              <div className={`card shadow mb-4 text-center`}>
                <div className={"card-body"}>
                  <IconWrapper>{feature.icon()}</IconWrapper>
                  <h3 className={"card-title h4 fw-bold my-3"}>{feature.title}</h3>
                  <p className={"card-text text-muted"}>{feature.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <CallToAction />
      </Section>
      {/* Services */}
      <Section id={"services"} className={"bg-white"}>
        <SectionHeader
          title="Nos services"
          subtitle="Vérifiez que votre besoin colle avec notre savoir faire"
        />
        <h3 className={"h4 text-primary fw-light"}>Ce qu{"'"}on adore faire</h3>
        <Row className="g-lg-5">
          {chunk(SERVICES.filter(service => service.supported), 2).map((services, chunkKey) => (
            <Col lg={6} key={chunkKey}>
              <ul className="list-group list-group-flush">
                {services.map((service, key) => (
                  <li key={`${chunkKey}-${key}`} className="list-group-item d-flex align-items-center">
                    <div className="me-4">
                      <Check className="fa-2x text-sub-primary" />
                    </div>
                    <div className={"text-muted"}><Markdown isInline>{service.text}</Markdown></div>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
        <h3 className={"mt-5 h4 text-primary fw-light"}>Ce qu{"'"}on ne fait PAS</h3>
        <Row className="g-lg-5">
          {chunk(SERVICES.filter(service => !service.supported), 2).map((services, chunkKey) => (
            <Col lg={6} key={chunkKey}>
              <ul className="list-group list-group-flush">
                {services.map((service, key) => (
                  <li key={`${chunkKey}-${key}`} className="list-group-item d-flex align-items-center">
                    <div className="me-4">
                      <XMark className="fa-2x text-sub-primary" />
                    </div>
                    <div className={"text-muted"}><Markdown isInline>{service.text}</Markdown></div>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
        <CallToAction />
      </Section>
      {/* Chiffres */}
      <Section id={"chiffres"}>
        <SectionHeader
          title="Les chiffres"
          subtitle="Quelques chiffres de cette jeune entreprise fondée en 2018"
        />
        <Row className="g-lg-5">
          {NUMBERS.map((number, key) => (
            <Col md={6} lg={3} key={key} className={"text-center"}>
              <div className={"text-sub-primary display-1 fw-bold"}>{number.value}</div>
              <h4 className="text-primary fw-light">{number.unit}</h4>
              <hr style={{width: '40%'}} className={'mx-auto'} />
              <p className="text-muted">{number.text}</p>
            </Col>
          ))}
        </Row>
        <CallToAction />
      </Section>
      <Row className="g-0">
        {/* Contact */}
        <Col md={6}>
          <Section id={"contact"} className={"bg-white h-100"}>
            <h2>Contact</h2>
            <p className={"text-muted"}>Laissez-nous un message et nous vous répondrons dans les plus brefs délais</p>
            <ContactForm onFinish={onFinish} onPending={onPending} isSubmitted={isFormSubmitted}/>
            {showSendButton && (
              <Button
                variant={"sub-primary"}
                size={"lg"}
                className={"mt-4 btn-block rounded-0"}
                onClick={() => forceIsFormSubmitted()}
                disabled={isFormPending}
              >Envoyer</Button>
            )}
          </Section>
        </Col>
        {/* SILARHI */}
        <Col md={6}>
          <Section id={"silarhi"} className={`${styles.bgLight2} h-100`}>
            <h2>SILARHI</h2>
            <p className={"text-muted"}>Les infos pratiques, c{"'"}est ici</p>
          </Section>
        </Col>
      </Row>
    </>
  )
}

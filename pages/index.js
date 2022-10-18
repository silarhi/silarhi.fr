import Section from "../components/Section/Section";
import home from '../public/images/home.jpg';
import Image from "next/future/image";
import styles from './index.module.scss';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconWrapper from "../components/IconWrapper/IconWrapper";
import CallToAction from "../components/CallToAction/CallToAction";
import Head from "next/head";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import {chunk} from "../utils/array";
import Markdown from "marked-react";
import {Check, CloudBolt, Code, LightBulb, MagnifyingGlass} from "../components/Icons/Icons";

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
];

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

export default function Home() {
  return (
    <>
      <Head>
        <title>Développement d{"'"}applications Web & PHP à Toulouse - Silarhi</title>
      </Head>
      {/* Header */}
      <div className={styles.bgWrap}>
        <Image src={home} sizes="100vw" fill style={{objectFit: 'cover'}} priority alt="" />
        <div className={styles.contentWrapper}>
          <Container>
            <h1>
              Développement d{"'"}applications Web
              <span>À Toulouse & en France</span>
            </h1>
            <h2>Donnez vie à vos idées</h2>
            <Button as={"a"} href={"#about"}>En savoir plus</Button>
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
              <div className={`card mb-4`}>
                <div className={"card-body"}>
                  <IconWrapper>{feature.icon()}</IconWrapper>
                  <h3 className={"card-title h4 text-center"}>{feature.title}</h3>
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
        <h3>Ce qu{"'"}on adore faire</h3>
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

        <CallToAction />
      </Section>
    </>
  )
}

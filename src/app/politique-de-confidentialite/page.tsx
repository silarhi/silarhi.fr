import type { Metadata } from 'next'
import Link from 'next/link'

import LegalLayout from '@/components/legal-layout'
import LegalSection from '@/components/legal-section'
import { COMPANY_INFO } from '@/lib/schemas'
import { getCanonicalUrl } from '@/utils/url'

export const metadata: Metadata = {
    title: `Politique de confidentialité - SILARHI`,
    description: `Les données personnelles traitées par silarhi.fr (formulaire de contact, mesure d’audience, hébergement), leurs destinataires, leur durée de conservation et comment exercer vos droits.`,
    alternates: {
        canonical: getCanonicalUrl('/politique-de-confidentialite'),
    },
}

export default function PrivacyPolicyPage() {
    return (
        <LegalLayout
            current="/politique-de-confidentialite"
            title="Politique de confidentialité"
            lead="Les données que le site traite, pourquoi, avec qui, combien de temps, et comment exercer vos droits. Le site ne dépose aucun cookie soumis à consentement."
            updated="2026-10-23"
        >
            <LegalSection id="responsable" title="Responsable du traitement">
                <p>
                    Le responsable des traitements décrits ci-dessous est <strong>{COMPANY_INFO.legalName}</strong>,{' '}
                    {COMPANY_INFO.legalForm} au capital de {COMPANY_INFO.shareCapital} –{' '}
                    {COMPANY_INFO.addressLines.join(', ')} – RCS {COMPANY_INFO.rcs.city} {COMPANY_INFO.rcs.number},
                    représentée par {COMPANY_INFO.manager}, gérant. Contact&nbsp;:{' '}
                    <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>.
                </p>
                <p>
                    Les données personnelles sont traitées conformément au règlement (UE) 2016/679 du 27 avril 2016
                    (RGPD) et à la loi n° 78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux
                    libertés. Le site ne demande aucune création de compte et ne collecte que les données décrites ici.
                    Aucune donnée n&apos;est publiée, cédée ou vendue à des tiers.
                </p>
            </LegalSection>
            <LegalSection id="formulaire-de-contact" title="Formulaire de contact">
                <ul>
                    <li>
                        <strong>Données</strong>&nbsp;: nom, adresse e-mail, numéro de téléphone et message.
                    </li>
                    <li>
                        <strong>Finalité</strong>&nbsp;: répondre à votre demande et, le cas échéant, établir un devis
                        et assurer le suivi de la relation qui en découle.
                    </li>
                    <li>
                        <strong>Base légale</strong>&nbsp;: mesures précontractuelles prises à votre demande (article
                        6.1.b du RGPD)&nbsp;; à défaut, l&apos;intérêt légitime de SILARHI à répondre aux personnes qui
                        la contactent (article 6.1.f).
                    </li>
                    <li>
                        <strong>Destinataires</strong>&nbsp;: SILARHI, et le service d&apos;envoi de formulaires{' '}
                        <strong>Formspree, Inc.</strong> (États-Unis), sous-traitant qui reçoit le message et le
                        transmet par e-mail à SILARHI.
                    </li>
                    <li>
                        <strong>Durée de conservation</strong>&nbsp;: trois ans à compter du dernier échange, si la
                        demande n&apos;aboutit pas à une mission. Si elle y aboutit, les échanges suivent la relation
                        commerciale régie par les{' '}
                        <Link href="/conditions-generales-de-vente">conditions générales de vente</Link>. Formspree
                        conserve aussi une copie des messages dans l&apos;historique du formulaire, pour une durée qui
                        dépend de l&apos;offre souscrite&nbsp;; cette copie n&apos;est pas gardée au-delà de la même
                        durée de trois ans.
                    </li>
                </ul>
            </LegalSection>
            <LegalSection id="mesure-audience" title="Mesure d’audience">
                <p>
                    Le site mesure sa fréquentation avec <strong>Umami</strong>, un outil auto-hébergé par
                    SILARHI&nbsp;: aucune donnée n&apos;est partagée avec un tiers. Umami ne traite{' '}
                    <strong>aucune donnée personnelle</strong>.
                </p>
                <ul>
                    <li>
                        <strong>Données</strong>&nbsp;: pages vues, page de provenance, type de navigateur et
                        d&apos;appareil, pays. Umami ne dépose aucun cookie et n&apos;enregistre pas l&apos;adresse
                        IP&nbsp;: les statistiques obtenues sont anonymes et agrégées.
                    </li>
                    <li>
                        <strong>Finalité</strong>&nbsp;: produire des statistiques de fréquentation pour améliorer le
                        site.
                    </li>
                    <li>
                        <strong>Base légale</strong>&nbsp;: intérêt légitime à mesurer l&apos;audience du site (article
                        6.1.f du RGPD). Cette mesure, anonyme et réservée à SILARHI, n&apos;exige pas de consentement.
                    </li>
                    <li>
                        <strong>Durée de conservation</strong>&nbsp;: les statistiques, qui ne permettent pas de vous
                        identifier, sont conservées tant que le site existe.
                    </li>
                </ul>
            </LegalSection>
            <LegalSection id="hebergement" title="Hébergement et journaux techniques">
                <p>
                    Lorsque vous consultez une page, l&apos;hébergeur <strong>Vercel Inc.</strong> et le CDN{' '}
                    <strong>Cloudflare, Inc.</strong> (États-Unis), qui achemine et protège le trafic du site,
                    enregistrent des journaux techniques.
                </p>
                <ul>
                    <li>
                        <strong>Données</strong>&nbsp;: adresse IP, date et heure, page demandée, navigateur.
                    </li>
                    <li>
                        <strong>Finalité</strong>&nbsp;: livrer les pages, assurer la sécurité du site et prévenir les
                        abus.
                    </li>
                    <li>
                        <strong>Base légale</strong>&nbsp;: intérêt légitime à assurer le fonctionnement et la sécurité
                        du site (article 6.1.f du RGPD).
                    </li>
                    <li>
                        <strong>Destinataires</strong>&nbsp;: Vercel et Cloudflare, sous-traitants chargés de
                        l&apos;hébergement et de la diffusion du site.
                    </li>
                    <li>
                        <strong>Durée de conservation</strong>&nbsp;: la durée fixée par chaque prestataire pour la
                        sécurité de sa plateforme&nbsp;; SILARHI n&apos;exploite pas ces journaux.
                    </li>
                </ul>
            </LegalSection>
            <LegalSection id="transferts" title="Transferts hors de l’Union européenne">
                <p>
                    Formspree, Vercel et Cloudflare sont établis aux États-Unis&nbsp;: les données qu&apos;ils traitent
                    peuvent y être transférées. Ces transferts sont encadrés par les garanties du chapitre V du RGPD.
                </p>
                <ul>
                    <li>
                        <strong>Formspree</strong>&nbsp;: clauses contractuelles types de la Commission européenne
                        (article 46 du RGPD), sur lesquelles Formspree s&apos;appuie en tant que sous-traitant.
                    </li>
                    <li>
                        <strong>Vercel</strong>&nbsp;: clauses contractuelles types de la Commission européenne
                        (décision 2021/914), intégrées à son accord de traitement des données.
                    </li>
                    <li>
                        <strong>Cloudflare</strong>&nbsp;: certification au Data Privacy Framework UE–États-Unis
                        (décision d&apos;adéquation du 10 juillet 2023), complétée par les clauses contractuelles types
                        de la Commission européenne.
                    </li>
                </ul>
            </LegalSection>
            <LegalSection id="vos-droits" title="Vos droits">
                <p>Vous disposez sur vos données des droits suivants&nbsp;:</p>
                <ul>
                    <li>
                        <strong>accès</strong>&nbsp;: savoir si des données vous concernant sont traitées et en obtenir
                        une copie&nbsp;;
                    </li>
                    <li>
                        <strong>rectification</strong>&nbsp;: faire corriger des données inexactes ou incomplètes&nbsp;;
                    </li>
                    <li>
                        <strong>effacement</strong>&nbsp;: faire supprimer vos données&nbsp;;
                    </li>
                    <li>
                        <strong>limitation</strong>&nbsp;: faire geler temporairement l&apos;utilisation de vos
                        données&nbsp;;
                    </li>
                    <li>
                        <strong>opposition</strong>&nbsp;: vous opposer à un traitement fondé sur l&apos;intérêt
                        légitime&nbsp;;
                    </li>
                    <li>
                        <strong>portabilité</strong>&nbsp;: recevoir les données que vous avez fournies dans un format
                        structuré, couramment utilisé et lisible par machine&nbsp;;
                    </li>
                    <li>
                        <strong>directives post-mortem</strong>&nbsp;: définir le sort de vos données après votre décès
                        (article 85 de la loi n° 78-17 du 6 janvier 1978).
                    </li>
                </ul>
                <p>
                    Pour les exercer, écrivez à <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a> ou à
                    l&apos;adresse postale ci-dessus. Aucune pièce d&apos;identité n&apos;est demandée, sauf doute
                    raisonnable sur votre identité. Une réponse vous est apportée dans un délai d&apos;un mois, qui peut
                    être prolongé de deux mois pour une demande complexe&nbsp;; vous en êtes alors informé.
                </p>
            </LegalSection>
            <LegalSection id="cnil" title="Réclamation auprès de la CNIL">
                <p>
                    Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la
                    Commission nationale de l&apos;informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715,
                    75334 Paris Cedex 07, ou en ligne sur{' '}
                    <a href="https://www.cnil.fr/fr/plaintes">cnil.fr/fr/plaintes</a>.
                </p>
            </LegalSection>
            <LegalSection id="securite" title="Sécurité et violation de données">
                <p>
                    Le site est servi exclusivement en HTTPS et seule SILARHI a accès aux outils qui reçoivent vos
                    données.
                </p>
                <p>
                    En cas de violation de données susceptible d&apos;engendrer un risque pour vos droits et libertés,
                    la CNIL est notifiée dans les 72 heures après sa découverte (article 33 du RGPD). Si le risque est
                    élevé, les personnes concernées sont aussi prévenues dans les meilleurs délais (article 34).
                </p>
            </LegalSection>
            <LegalSection id="cookies" title="Cookies">
                <p>
                    Le site ne dépose <strong>aucun cookie soumis à consentement</strong>&nbsp;: c&apos;est pourquoi
                    aucun bandeau ne vous est présenté. Ce qu&apos;il enregistre dans votre navigateur est détaillé dans
                    la <Link href="/cookies">politique de cookies</Link>.
                </p>
            </LegalSection>
            <LegalSection id="modifications" title="Modifications">
                <p>
                    Cette politique peut évoluer, notamment si le site ajoute un service. La date de dernière mise à
                    jour figure en haut de la page.
                </p>
            </LegalSection>
        </LegalLayout>
    )
}

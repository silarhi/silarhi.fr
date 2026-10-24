import type { Metadata } from 'next'
import Link from 'next/link'

import LegacyLegalAnchorRedirect from '@/components/legacy-legal-anchor-redirect'
import LegalLayout from '@/components/legal-layout'
import LegalSection from '@/components/legal-section'
import { COMPANY_INFO } from '@/lib/schemas'
import { getCanonicalUrl } from '@/utils/url'

export const metadata: Metadata = {
    title: `Mentions légales - SILARHI`,
    description: `Éditeur, hébergeur, propriété intellectuelle et droit applicable du site silarhi.fr, édité par SILARHI, agence de développement web à Toulouse.`,
    alternates: {
        canonical: getCanonicalUrl('/mentions-legales'),
    },
}

export default function LegalMentionPage() {
    return (
        <>
            <LegacyLegalAnchorRedirect />
            <LegalLayout
                current="/mentions-legales"
                title="Mentions légales"
                lead="L’éditeur du site silarhi.fr, son hébergement, les conditions de son utilisation et le droit qui s’y applique."
                updated="2026-10-23"
                identity
            >
                <LegalSection id="presentation" title="Présentation du site">
                    <p>
                        En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
                        l&apos;économie numérique, il est précisé aux utilisateurs du site&nbsp;
                        <a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;l&apos;identité des différents intervenants
                        dans le cadre de sa réalisation et de son suivi : l&apos;éditeur est présenté ci-dessus, et
                        l&apos;hébergement ci-dessous.
                    </p>
                    <p>
                        <strong>Créateur</strong>&nbsp;:&nbsp;
                        <a href="https://sainthillier.fr/">Guillaume Sainthillier</a>
                        <br />
                        <strong>Webmaster</strong>&nbsp;: Guillaume Sainthillier – {COMPANY_INFO.email}
                    </p>
                </LegalSection>
                <LegalSection id="hebergement" title="Hébergement et diffusion">
                    <p>
                        <strong>Hébergeur</strong>&nbsp;: Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
                        États-Unis – <a href="https://vercel.com/">vercel.com</a>
                        <br />
                        <strong>CDN et proxy</strong>&nbsp;: Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107,
                        États-Unis – <a href="https://www.cloudflare.com/">cloudflare.com</a>
                    </p>
                </LegalSection>
                <LegalSection id="conditions-utilisation" title="Conditions générales d’utilisation du site">
                    <p>
                        L&apos;utilisation du site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;implique
                        l&apos;acceptation pleine et entière des conditions générales d&apos;utilisation ci-après
                        décrites. Ces conditions d&apos;utilisation sont susceptibles d&apos;être modifiées ou
                        complétées à tout moment, les utilisateurs du site&nbsp;
                        <a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;sont donc invités à les consulter de manière
                        régulière.
                    </p>
                    <p>
                        Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison
                        de maintenance technique peut être toutefois décidée par SILARHI, qui s&apos;efforcera alors de
                        communiquer préalablement aux utilisateurs les dates et heures de l&apos;intervention.
                    </p>
                    <p>
                        Le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;est mis à jour régulièrement par
                        Guillaume Sainthillier. De la même façon, les mentions légales peuvent être modifiées à tout
                        moment : elles s&apos;imposent néanmoins à l&apos;utilisateur qui est invité à s&apos;y référer
                        le plus souvent possible afin d&apos;en prendre connaissance.
                    </p>
                </LegalSection>
                <LegalSection id="services" title="Description des services fournis">
                    <p>
                        Le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;a pour objet de fournir une
                        information concernant l&apos;ensemble des activités de la société.
                    </p>
                    <p>
                        SILARHI s&apos;efforce de fournir sur le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>
                        &nbsp;des informations aussi précises que possible. Toutefois, elle ne pourra être tenue
                        responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu&apos;elles
                        soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                    </p>
                    <p>
                        Toutes les informations indiquées sur le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>
                        &nbsp;sont données à titre indicatif, et sont susceptibles d&apos;évoluer. Par ailleurs, les
                        renseignements figurant sur le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;ne
                        sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis
                        leur mise en ligne.
                    </p>
                </LegalSection>
                <LegalSection id="donnees-techniques" title="Limitations contractuelles sur les données techniques">
                    <p>Le site utilise la technologie JavaScript.</p>
                    <p>
                        Le site Internet ne pourra être tenu responsable de dommages matériels liés à l&apos;utilisation
                        du site. De plus, l&apos;utilisateur du site s&apos;engage à accéder au site en utilisant un
                        matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis à
                        jour.
                    </p>
                </LegalSection>
                <LegalSection id="propriete-intellectuelle" title="Propriété intellectuelle et contrefaçons">
                    <p>
                        SILARHI est propriétaire des droits de propriété intellectuelle ou détient les droits
                        d&apos;usage sur tous les éléments accessibles sur le site, notamment les textes, images,
                        graphismes, logo, icônes, sons, logiciels.
                    </p>
                    <p>
                        Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des
                        éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation
                        écrite préalable de : SILARHI.
                    </p>
                    <p>
                        Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il
                        contient sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément
                        aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                    </p>
                    <p>
                        Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998
                        transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de
                        données.
                    </p>
                </LegalSection>
                <LegalSection id="responsabilite" title="Limitations de responsabilité">
                    <p>
                        SILARHI ne pourra être tenue responsable des dommages directs et indirects causés au matériel de
                        l&apos;utilisateur, lors de l&apos;accès au site silarhi.fr, et résultant soit de
                        l&apos;utilisation d&apos;un matériel ne répondant pas aux{' '}
                        <a href="#donnees-techniques">spécifications indiquées plus haut</a>, soit de l&apos;apparition
                        d&apos;un bug ou d&apos;une incompatibilité.
                    </p>
                    <p>
                        SILARHI ne pourra également être tenue responsable des dommages indirects (tels par exemple
                        qu&apos;une perte de marché ou perte d&apos;une chance) consécutifs à l&apos;utilisation du
                        site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>.
                    </p>
                    <p>
                        Des espaces interactifs (possibilité de poser des questions dans l&apos;espace contact) sont à
                        la disposition des utilisateurs. SILARHI se réserve le droit de supprimer, sans mise en demeure
                        préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable
                        en France, en particulier aux dispositions relatives à la protection des données. Le cas
                        échéant, SILARHI se réserve également la possibilité de mettre en cause la responsabilité civile
                        et/ou pénale de l&apos;utilisateur, notamment en cas de message à caractère raciste, injurieux,
                        diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie…).
                    </p>
                </LegalSection>
                <LegalSection id="liens-hypertextes" title="Liens hypertextes">
                    <p>
                        Le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;contient un certain nombre de
                        liens hypertextes vers d&apos;autres sites, mis en place avec l&apos;autorisation de SILARHI.
                        Cependant, SILARHI n&apos;a pas la possibilité de vérifier le contenu des sites ainsi visités,
                        et n&apos;assumera en conséquence aucune responsabilité de ce fait.
                    </p>
                </LegalSection>
                <LegalSection id="vos-donnees" title="Données personnelles et cookies">
                    <p>
                        Les données personnelles traitées par le site, vos droits et la manière de les exercer sont
                        décrits dans la <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
                        Ce que le site enregistre dans votre navigateur est détaillé dans la{' '}
                        <Link href="/cookies">politique de cookies</Link>.
                    </p>
                </LegalSection>
                <LegalSection id="droit-applicable" title="Droit applicable et attribution de juridiction">
                    <p>
                        Tout litige en relation avec l&apos;utilisation du site&nbsp;
                        <a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;est soumis au droit français. Il est fait
                        attribution exclusive de juridiction aux tribunaux compétents de Toulouse.
                    </p>
                </LegalSection>
                <LegalSection id="lois" title="Les principales lois concernées">
                    <ul>
                        <li>
                            Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la
                            protection des personnes physiques à l&apos;égard du traitement des données à caractère
                            personnel (RGPD).
                        </li>
                        <li>
                            Loi n° 78-17 du 6 janvier 1978 modifiée relative à l&apos;informatique, aux fichiers et aux
                            libertés.
                        </li>
                        <li>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.</li>
                    </ul>
                </LegalSection>
                <LegalSection id="lexique" title="Lexique">
                    <p>
                        <strong>Utilisateur</strong>&nbsp;: internaute se connectant, utilisant le site susnommé.
                    </p>
                    <p>
                        <strong>Informations personnelles</strong>&nbsp;: «&nbsp;toute information se rapportant à une
                        personne physique identifiée ou identifiable&nbsp;» (article 4 du RGPD).
                    </p>
                </LegalSection>
            </LegalLayout>
        </>
    )
}

import type { Metadata } from 'next'

import HeroSection from '@/components/hero-section'
import Section from '@/components/ui/section'
import { getCanonicalUrl } from '@/utils/url'

export const metadata: Metadata = {
    title: `Mentions légales - SILARHI`,
    alternates: {
        canonical: getCanonicalUrl('/mentions-legales'),
    },
}

export default function LegalMentionPage() {
    return (
        <>
            <HeroSection title="Mentions Légales" />
            <Section>
                <h2>1. Présentation du site.</h2>
                <p>
                    En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;
                    économie numérique, il est précisé aux utilisateurs du site&nbsp;
                    <a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;l&apos;identité des différents intervenants dans
                    le cadre de sa réalisation et de son suivi :<br />
                </p>
                <p>
                    <strong>Éditeur</strong>&nbsp;: SILARHI, SARL au capital de 1 000 € – 116 Route d&apos;Espagne,
                    HELIOPOLIS 4, BAT 113, BAL 411, 31100 Toulouse – RCS Toulouse 841 541 667 – SIRET 841 541 667 00017
                    – TVA FR96841541667
                    <br />
                    <strong>Contact</strong>&nbsp;: hello@silarhi.fr – <a href="tel:+33607275826">06 07 27 58 26</a>
                    <br />
                    <strong>Directeur de la publication</strong>&nbsp;: Guillaume Sainthillier
                    <br />
                    <strong>Créateur</strong>&nbsp;:&nbsp;<a href="https://sainthillier.fr/">Guillaume Sainthillier</a>
                    <br />
                    <strong>Webmaster</strong>&nbsp;: Guillaume Sainthillier – hello@silarhi.fr
                    <br />
                    <strong>Hébergeur</strong>&nbsp;: Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
                    États-Unis – <a href="https://vercel.com/">vercel.com</a>
                    <br />
                    <strong>CDN et proxy</strong>&nbsp;: Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107,
                    États-Unis – <a href="https://www.cloudflare.com/">cloudflare.com</a>
                </p>
                <h2>2. Conditions générales d&apos;utilisation du site et des services proposés.</h2>
                <p>
                    L&apos;utilisation du site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;implique l&apos;
                    acceptation pleine et entière des conditions générales d&apos;utilisation ci-après décrites. Ces
                    conditions d&apos;utilisation sont susceptibles d&apos;être modifiées ou complétées à tout moment,
                    les utilisateurs du site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;sont donc invités à
                    les consulter de manière régulière.
                    <br />
                </p>
                <p>
                    Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de
                    maintenance technique peut être toutefois décidée par SILARHI, qui s&apos;efforcera alors de
                    communiquer préalablement aux utilisateurs les dates et heures de l&apos;intervention.
                    <br />
                </p>
                <p>
                    Le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;est mis à jour régulièrement par
                    Guillaume Sainthillier. De la même façon, les mentions légales peuvent être modifiées à tout moment
                    : elles s&apos;imposent néanmoins à l&apos;utilisateur qui est invité à s&apos;y référer le plus
                    souvent possible afin d&apos;en prendre connaissance.
                    <br />
                </p>
                <h2>3. Description des services fournis.</h2>
                <p>
                    Le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;a pour objet de fournir une
                    information concernant l&apos;ensemble des activités de la société.
                    <br />
                </p>
                <p>
                    SILARHI s&apos;efforce de fournir sur le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>
                    &nbsp;des informations aussi précises que possible. Toutefois, il ne pourra être tenue responsable
                    des omissions, des inexactitudes et des carences dans la mise à jour, qu&apos;elles soient de son
                    fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                    <br />
                </p>
                <p>
                    Tous les informations indiquées sur le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>
                    &nbsp;sont données à titre indicatif, et sont susceptibles d&apos;évoluer. Par ailleurs, les
                    renseignements figurant sur le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;ne sont
                    pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise
                    en ligne.
                    <br />
                </p>
                <h2>4. Limitations contractuelles sur les données techniques.</h2>
                <p>
                    Le site utilise la technologie JavaScript.
                    <br />
                </p>
                <p>
                    Le site Internet ne pourra être tenu responsable de dommages matériels liés à l&apos;utilisation du
                    site. De plus, l&apos;utilisateur du site s&apos;engage à accéder au site en utilisant un matériel
                    récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour
                    <br />
                </p>
                <h2>5. Propriété intellectuelle et contrefaçons.</h2>
                <p>
                    SILARHI est propriétaire des droits de propriété intellectuelle ou détient les droits d&apos;usage
                    sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo,
                    icônes, sons, logiciels.
                    <br />
                </p>
                <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des
                    éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation
                    écrite préalable de : SILARHI.
                    <br />
                </p>
                <p>
                    Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il contient
                    sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux
                    dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                    <br />
                </p>
                <h2>6. Limitations de responsabilité.</h2>
                <p>
                    SILARHI ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l
                    &apos;utilisateur, lors de l&apos;accès au site silarhi.fr, et résultant soit de l&apos;utilisation
                    d &apos;un matériel ne répondant pas aux spécifications indiquées au point 4, soit de
                    l&apos;apparition d&apos;un bug ou d&apos;une incompatibilité.
                    <br />
                </p>
                <p>
                    SILARHI ne pourra également être tenue responsable des dommages indirects (tels par exemple qu&apos;
                    une perte de marché ou perte d&apos;une chance) consécutifs à l&apos;utilisation du site&nbsp;
                    <a href="https://silarhi.fr/">silarhi.fr</a>.<br />
                </p>
                <p>
                    Des espaces interactifs (possibilité de poser des questions dans l&apos;espace contact) sont à la
                    disposition des utilisateurs. SILARHI se réserve le droit de supprimer, sans mise en demeure
                    préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en
                    France, en particulier aux dispositions relatives à la protection des données. Le cas échéant,
                    SILARHI se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale
                    de l&apos;utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou
                    pornographique, quel que soit le support utilisé (texte, photographie…).
                    <br />
                </p>
                <h2 id="donnees-personnelles">7. Gestion des données personnelles.</h2>
                <p>
                    En France, les données personnelles sont notamment protégées par le Règlement (UE) 2016/679 du 27
                    avril 2016 (RGPD), la loi n° 78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et
                    aux libertés et l&apos;article L. 226-13 du Code pénal. Le responsable du traitement est SILARHI.
                </p>
                <p>
                    Lors de la consultation du site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>, l&apos;hébergeur
                    (Vercel) et le CDN (Cloudflare) traitent des données techniques de connexion, dont l&apos;adresse IP
                    de l&apos;utilisateur, pour acheminer les pages et assurer la sécurité du site.
                </p>
                <p>
                    La mesure d&apos;audience est réalisée avec Umami, auto-hébergé par SILARHI&nbsp;: cet outil ne
                    dépose aucun cookie et ne conserve aucune donnée personnelle (l&apos;adresse IP n&apos;est pas
                    enregistrée). Les statistiques obtenues sont anonymes et agrégées.
                </p>
                <p>
                    Le formulaire de contact recueille le nom, l&apos;adresse email, le numéro de téléphone et le
                    message de l&apos;utilisateur. Ces données sont utilisées uniquement pour répondre à sa demande et
                    sont conservées le temps nécessaire à son traitement et au suivi de la relation qui peut en
                    découler. Elles sont transmises via Formspree (Formspree Inc., États-Unis), qui achemine le message
                    par email à SILARHI.
                </p>
                <p>
                    Les destinataires des données sont SILARHI et ses prestataires techniques cités ci-dessus (Vercel,
                    Cloudflare, Formspree), établis aux États-Unis. Aucune information personnelle de l&apos;utilisateur
                    n&apos;est publiée, cédée ou vendue à des tiers.
                </p>
                <p>
                    Conformément au RGPD et à la loi n° 78-17 du 6 janvier 1978, tout utilisateur dispose d&apos;un
                    droit d&apos;accès, de rectification, d&apos;effacement, de limitation, de portabilité et
                    d&apos;opposition aux données personnelles le concernant. Ces droits s&apos;exercent par email à
                    hello@silarhi.fr ou par courrier à l&apos;adresse de l&apos;éditeur. L&apos;utilisateur peut
                    également introduire une réclamation auprès de la <a href="https://www.cnil.fr/">CNIL</a>.
                </p>
                <p>
                    Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant
                    la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.
                </p>
                <h2 id="cookies">8. Liens hypertextes et cookies.</h2>
                <p>
                    Le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;contient un certain nombre de liens
                    hypertextes vers d&apos;autres sites, mis en place avec l&apos;autorisation de SILARHI. Cependant,
                    SILARHI n&apos;a pas la possibilité de vérifier le contenu des sites ainsi visités, et
                    n&apos;assumera en conséquence aucune responsabilité de ce fait.
                </p>
                <p>
                    Le site&nbsp;<a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;ne dépose aucun cookie nécessitant le
                    consentement de l&apos;utilisateur. La mesure d&apos;audience (Umami) fonctionne sans cookie. Seule
                    la préférence de thème (clair ou sombre) choisie par l&apos;utilisateur est enregistrée dans le
                    stockage local de son navigateur, pour lui être appliquée lors de ses visites suivantes.
                </p>
                <h2>9. Droit applicable et attribution de juridiction.</h2>
                <p>
                    Tout litige en relation avec l&apos;utilisation du site&nbsp;
                    <a href="https://silarhi.fr/">silarhi.fr</a>&nbsp;est soumis au droit français. Il est fait
                    attribution exclusive de juridiction aux tribunaux compétents de Toulouse.
                </p>
                <h2>10. Les principales lois concernées.</h2>
                <p>
                    Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection
                    des personnes physiques à l&apos;égard du traitement des données à caractère personnel (RGPD).
                </p>
                <p>
                    Loi n° 78-17 du 6 janvier 1978 modifiée relative à l&apos;informatique, aux fichiers et aux
                    libertés.
                </p>
                <p>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.</p>
                <h2>11. Lexique.</h2>
                <p>Utilisateur : Internaute se connectant, utilisant le site susnommé.</p>
                <p>
                    Informations personnelles : «&nbsp;toute information se rapportant à une personne physique
                    identifiée ou identifiable&nbsp;» (article 4 du RGPD).
                </p>
            </Section>
        </>
    )
}

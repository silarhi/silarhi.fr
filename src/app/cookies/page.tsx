import type { Metadata } from 'next'
import Link from 'next/link'

import LegalLayout from '@/components/legal-layout'
import LegalSection from '@/components/legal-section'
import { COMPANY_INFO } from '@/lib/schemas'
import { getCanonicalUrl } from '@/utils/url'

export const metadata: Metadata = {
    title: `Politique de cookies - SILARHI`,
    description: `silarhi.fr ne dépose aucun cookie : seule votre préférence de thème est enregistrée dans votre navigateur, et la mesure d’audience fonctionne sans cookie.`,
    alternates: {
        canonical: getCanonicalUrl('/cookies'),
    },
}

const storedItems = [
    {
        name: 'Aucun cookie',
        type: 'Cookie',
        purpose: 'Le site ne dépose aucun cookie, ni propre, ni tiers.',
        duration: '–',
    },
    {
        name: 'theme',
        isKey: true,
        type: 'Stockage local (localStorage)',
        purpose:
            'Retenir le thème clair, sombre ou système que vous choisissez avec le bouton de thème. La clé n’est créée que si vous changez de thème.',
        duration: 'Jusqu’à ce que vous effaciez les données du site dans votre navigateur',
    },
    {
        name: 'Umami',
        type: 'Mesure d’audience',
        purpose: 'Statistiques de fréquentation anonymes, sans cookie ni stockage dans votre navigateur.',
        duration: '–',
    },
]

export default function CookiesPage() {
    return (
        <LegalLayout
            current="/cookies"
            title="Politique de cookies"
            lead="Ce que le site enregistre dans votre navigateur, et pourquoi aucun bandeau de consentement ne vous est présenté."
            updated="2026-10-23"
        >
            <LegalSection id="en-bref" title="En bref">
                <p>
                    Le site <a href="https://silarhi.fr/">silarhi.fr</a> ne dépose <strong>aucun cookie</strong>. Il
                    n&apos;utilise ni publicité, ni bouton de réseau social, ni outil de mesure d&apos;audience à
                    cookies. Seule votre préférence de thème peut être enregistrée dans le stockage local de votre
                    navigateur.
                </p>
            </LegalSection>
            <LegalSection id="ce-qui-est-enregistre" title="Ce qui est enregistré dans votre navigateur">
                <div className="border-border -mx-5 mb-4 overflow-x-auto border-y sm:-mx-8">
                    <table className="w-full border-collapse text-left text-sm max-sm:block sm:min-w-xl">
                        <thead className="bg-background text-foreground max-sm:sr-only">
                            <tr>
                                <th scope="col" className="px-5 py-3 font-semibold sm:pl-8">
                                    Nom
                                </th>
                                <th scope="col" className="px-5 py-3 font-semibold">
                                    Type
                                </th>
                                <th scope="col" className="px-5 py-3 font-semibold">
                                    Finalité
                                </th>
                                <th scope="col" className="px-5 py-3 font-semibold sm:pr-8">
                                    Durée
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-border divide-y max-sm:block">
                            {storedItems.map((item) => (
                                <tr key={item.name} className="align-top max-sm:block max-sm:px-5 max-sm:py-4">
                                    <th
                                        scope="row"
                                        className="text-foreground px-5 py-4 font-semibold max-sm:block max-sm:p-0 max-sm:pb-1 sm:pl-8"
                                    >
                                        {item.isKey ? <code>{item.name}</code> : item.name}
                                    </th>
                                    <td className="px-5 py-4 max-sm:block max-sm:px-0 max-sm:py-0.5">
                                        <span className="font-semibold sm:hidden" aria-hidden="true">
                                            Type&nbsp;:{' '}
                                        </span>
                                        {item.type}
                                    </td>
                                    <td className="px-5 py-4 max-sm:block max-sm:px-0 max-sm:py-0.5">
                                        <span className="font-semibold sm:hidden" aria-hidden="true">
                                            Finalité&nbsp;:{' '}
                                        </span>
                                        {item.purpose}
                                    </td>
                                    <td className="px-5 py-4 sm:pr-8 max-sm:block max-sm:px-0 max-sm:py-0.5">
                                        <span className="font-semibold sm:hidden" aria-hidden="true">
                                            Durée&nbsp;:{' '}
                                        </span>
                                        {item.duration}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p>
                    La préférence de thème ne contient aucune donnée personnelle et n&apos;est jamais transmise au
                    serveur&nbsp;: elle reste dans votre navigateur. Vous pouvez la supprimer à tout moment en effaçant
                    les données du site dans les réglages de votre navigateur.
                </p>
                <p>
                    Si Cloudflare, qui protège le site, doit vérifier qu&apos;une visite n&apos;est pas automatisée, il
                    peut exceptionnellement déposer un cookie de sécurité (<code>cf_clearance</code>), strictement
                    nécessaire et sans finalité publicitaire.
                </p>
            </LegalSection>
            <LegalSection id="consentement" title="Aucun consentement nécessaire">
                <p>
                    L&apos;article 82 de la loi n° 78-17 du 6 janvier 1978 impose de recueillir votre consentement avant
                    de lire ou d&apos;écrire des informations dans votre terminal, sauf lorsque ces opérations sont
                    strictement nécessaires à un service que vous demandez expressément.
                </p>
                <p>
                    C&apos;est le cas de la préférence de thème, enregistrée uniquement lorsque vous choisissez un
                    thème. La mesure d&apos;audience, réalisée avec Umami, n&apos;enregistre rien dans votre navigateur.
                    Le site n&apos;a donc pas besoin de vous demander votre consentement, et aucun bandeau ne vous est
                    présenté.
                </p>
            </LegalSection>
            <LegalSection id="sites-externes" title="Sites externes">
                <p>
                    Les sites ouverts depuis un lien (réseaux sociaux, sites de clients, documentation…) appliquent leur
                    propre politique en matière de cookies.
                </p>
            </LegalSection>
            <LegalSection id="en-savoir-plus" title="En savoir plus">
                <p>
                    Les données personnelles traitées par le site et vos droits sont décrits dans la{' '}
                    <Link href="/politique-de-confidentialite">politique de confidentialité</Link>. Pour toute question,
                    écrivez à <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>.
                </p>
            </LegalSection>
        </LegalLayout>
    )
}

import { Metadata } from 'next'

import Hero from '@/components/HeroTitle'
import { Download } from '@/components/Icons'
import Section from '@/components/Section'

export const metadata: Metadata = {
    title: `Conditions Générales de Vente - SILARHI`,
}

export default function Page() {
    return (
        <>
            <Hero title="Conditions générales de vente" />
            <Section>
                <p>
                    <em className="text-gray-600 inline-block mr-2">Mis à jour le 29/03/2019</em>
                    <a
                        href="/pdf/CGV.pdf"
                        className="inline-block px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        download
                    >
                        <Download className="mr-1 inline" />
                        Télécharger au format PDF
                    </a>
                </p>
                <h2>Article 1 : Les parties</h2>
                <p>
                    Le terme « Client » désigne toute personne morale ou physique, ayant requis les compétences du
                    Prestataire pour toute prestation de services ou produit proposé audit Client.
                </p>
                <p>
                    Le terme « Prestataire » désigne la société SILARHI, SASU au capital de 1 000 €, 116 Route d{"'"}
                    Espagne – BAT 113 BAL 411, 31100 Toulouse, immatriculée au RCS de TOULOUSE sous le numéro 841541667
                    et représentée par Guillaume Sainthillier en sa qualité de Gérant.
                </p>
                <h2>Article 2 : L{"'"}objet du contrat</h2>
                <p>Le contrat établi les relations commerciales entre le Prestataire et le Client.</p>
                <h2>Article 3 : Généralités et acceptation du contrat</h2>
                <p>
                    Le Prestataire se réserve le droit de modifier les présentes conditions générales de vente et l{"'"}
                    ensemble des formules et tarifs qu{"'"}il propose à tout moment et ce, sans préavis. Toute
                    modification effectuée n{"'"}affectera pas les devis ou bons de commande dont les dates sont
                    antérieures à la date de modification des conditions générales de vente. Dans le cas où le Client
                    est un particulier, il reconnaît être majeur conformément aux lois du pays dans lequel il réside. En
                    acceptant un devis ou un bon de commande édité par le Prestataire, le Client reconnaît avoir pris
                    connaissance et accepté les présentes conditions générales de vente.
                </p>
                <h2>Article 4 : Traitement et envoi des fichiers par le client</h2>
                <p>
                    Le client s{"'"}engage à faire parvenir au prestataire l{"'"}ensemble des fichiers client (textes,
                    polices et images, même issus de tiers, en libres de droits, structure et / ou modèle de données,
                    brief, cahier des charges) avant le début de la prestation. Les textes sont à fournir sous format
                    électronique et typographié sans fautes d{"'"}orthographe ; aucune saisie de texte ne sera réalisée.
                    Le Prestataire ne peut en aucun cas être tenu pour responsable des fautes d{"'"}orthographe
                    présentes dans les textes fournis par le Client. Toutefois, le Client peut confier la rédaction de
                    ses contenus au Prestataire si nécessaire (prestation faisant l{"'"}objet d{"'"}un devis à part).
                    Les polices de caractères sont à insérer dans les envois (en cas de polices non libres de droit, le
                    coût de la licence sera facturée en sus). Les images sont à fournir dans une taille et une
                    résolution suffisantes. La qualité des images fournies par le client et leur rendu sont indépendants
                    de la création de la maquette.
                </p>
                <h2>Article 5 : Modification de la demande initiale par le client</h2>
                <p>
                    Toute nouvelle prestation non comprise dans le devis initial fera l{"'"}objet d{"'"}un nouveau
                    devis. Si la durée d{"'"}une prestation dépassait de manière significative la durée prévue dans le
                    devis initial du fait de demandes émanant du client, de données non fournies avant l{"'"}
                    établissement du devis, une facturation journalière, sur la base tarifaire journalière du devis sera
                    établie. Les modifications significatives, reprises de développement, retard dans la prise de
                    décision ou livraison tardive de documents par le client et nécessaires à la prestation, repoussent
                    d{"'"}autant le délai de livraison établi entre les parties.
                </p>
                <h2>Article 6 : Cession des droits</h2>
                <p>
                    La cession des droits d{"'"}utilisation et de modification des développements réalisés par le
                    prestataire s{"'"}effectue à complet encaissement des montants facturés sauf dispositions contraires
                    mentionnées sur le devis et/ou la facture. Cette cession sera détaillée et précisée au cas par cas
                    sur chaque devis et/ou facture en fonction de ce qui aura été défini par les deux parties. Sauf
                    mention contraire précisée sur chaque devis et/ou facture, le règlement complet de la facture
                    entraîne la cession des droits d{"'"}utilisation, de modification et de diffusion du développement
                    pour le Client.
                </p>
                <h2>Article 7 : Confidentialité</h2>
                <p>
                    Au titre de la confidentialité et ce, avant et pendant toute la durée du projet, le Prestataire s
                    {"'"}engage à garder confidentiel toutes informations et/ou documents de quelque nature que ce soit
                    concernant le Client et son projet.
                </p>
                <h2>Article 8 : Conditions de règlement</h2>
                <p>
                    Sauf mentions contraires dans le devis et/ou la facture, un acompte de 30% minimum du montant TTC
                    total sera demandé à la commande. Les prestations doivent être réglées au Prestataire aux dates
                    mentionnées sur le devis et/ou la facture client. Le client s{"'"}engage à respecter les dates de
                    paiement mentionnées sur son devis et/ou sa facture et à retourner sa facture datée et signée avec
                    la mention « Lu et approuvé » ; cette disposition est aussi un élément essentiel du contrat.
                </p>
                <h2>Article 9 : Recouvrement des créances</h2>
                <p>
                    En cas de non paiement, l{"'"}ensemble des frais de recouvrement seront à la charge du client. Si
                    nécessaire, le Prestataire pourra faire appel aux services d{"'"}une société d{"'"}affacturage pour
                    le recouvrement de ses créances clients.
                </p>
                <h2>Article 10 : La force majeure</h2>
                <p>
                    Les parties ne peuvent être considérées comme responsables ou ayant faillis à leurs obligations
                    contractuelles, lorsque le défaut d{"'"}exécution des obligations respectives a pour origine la
                    force majeure ; le contrat entre les parties est suspendu jusqu{"'"}à l{"'"}extinction des causes
                    ayant engendrées la force majeure. La force majeure prend en compte des faits ou circonstances
                    irrésistibles, extérieurs aux parties, imprévisibles et indépendants de la volonté des parties,
                    malgré tous les efforts raisonnablement possibles pour les empêcher. Sont aussi considérés comme cas
                    de force majeure, le blocage des moyens de transports ou d{"'"}approvisionnements, tremblements de
                    terre, incendies, tempêtes, inondations, foudre, l{"'"}arrêt des réseaux de télécommunication, et
                    notamment tous les réseaux accessibles par internet, ou difficultés propres aux réseaux de
                    télécommunication extérieurs aux parties. La partie touchée par la force majeure en avisera l{"'"}
                    autre dans les cinq (5) jours ouvrables suivant la date à laquelle elle en aura eu connaissance. Les
                    deux parties conviendront alors des conditions dans lesquelles l{"'"}exécution du contrat sera
                    poursuivie.
                </p>
                <h2>Article 11 : Promotion des créations</h2>
                <p>
                    Sauf dispositions contraires écrites, le prestataire pourra diffuser toutes créations réalisées,
                    soit pour le client, soit pour un tiers pour lequel intervient le client, à des fins de «
                    présentation de créations » sur tous types de supports sans limitation de durée.
                </p>
                <h2>Article 12 : Les conditions générales de vente</h2>
                <p>
                    Le prestataire peut modifier, ajouter ou retrancher des dispositions à ces conditions générales de
                    vente sans préavis et sans avoir à en aviser ses clients ou des tiers préalablement.
                </p>
                <h2>Article 13 : Règlement des litiges</h2>
                <p>
                    Le contrat est soumis au droit Français. En cas de litiges, les parties s{"'"}engagent à tout faire
                    pour régler leurs différents à l{"'"}amiable. Au cas où une résolution amiable ne pourrait aboutir,
                    la juridiction compétente est celle de TOULOUSE.
                </p>
            </Section>
        </>
    )
}

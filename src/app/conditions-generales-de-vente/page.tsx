import { Metadata } from 'next'

import HeroSection from '@/components/hero-section'
import { Download } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import { getCanonicalUrl } from '@/utils/url'

export const metadata: Metadata = {
    title: `Conditions Générales de Vente - SILARHI`,
    alternates: {
        canonical: getCanonicalUrl('/conditions-generales-de-vente'),
    },
}

export default function Page() {
    return (
        <>
            <HeroSection title="Conditions générales de vente" />
            <Section>
                <div className="mb-4 flex flex-row flex-wrap gap-4">
                    <span className="text-foreground/80 italic">Mis à jour le 19/01/2026</span>
                    <a href="/pdf/CGV.pdf" download>
                        <Download className="mr-1 inline-block" />
                        Télécharger au format PDF
                    </a>
                </div>
                <h2>Article 1 : Les parties</h2>
                <p>
                    Le terme « Client » désigne toute personne morale ou physique, ayant requis les compétences du
                    Prestataire pour toute prestation de services ou produit proposé audit Client.
                </p>
                <p>
                    Le terme « Prestataire » désigne la société SILARHI, SARL au capital de 1 000 €, 116 Route
                    d&apos;Espagne - BAT 113 BAL 411, 31100 Toulouse, immatriculée au RCS de TOULOUSE sous le numéro
                    841541667 et représentée par Guillaume Sainthillier en sa qualité de Gérant.
                </p>
                <h2>Article 2 : L&apos;objet du contrat</h2>
                <p>Le contrat établit les relations commerciales entre le Prestataire et le Client.</p>
                <h2>Article 3 : Généralités et acceptation du contrat</h2>
                <p>
                    Le Prestataire se réserve le droit de modifier les présentes conditions générales de vente et
                    l&apos;ensemble des formules et tarifs qu&apos;il propose à tout moment et ce, sans préavis. Toute
                    modification effectuée n&apos;affecte pas les devis ou bons de commande dont les dates sont
                    antérieures à la date de modification des conditions générales de vente. Dans le cas où le Client
                    est un particulier, il reconnaît être majeur conformément aux lois du pays dans lequel il réside. En
                    acceptant un devis ou un bon de commande édité par le Prestataire, le Client reconnaît avoir pris
                    connaissance et accepté les présentes conditions générales de vente.
                </p>
                <h2>Article 4 : Traitement et envoi des fichiers par le client</h2>
                <p>
                    Le client s&apos;engage à faire parvenir au prestataire l&apos;ensemble des fichiers client (textes,
                    polices et images, même issus de tiers, en libres de droits, structure et / ou modèle de données,
                    brief, cahier des charges) avant le début de la prestation. Les textes sont à fournir sous format
                    électronique et typographié sans fautes d&apos;orthographe ; aucune saisie de texte ne sera
                    réalisée. Le Prestataire ne peut en aucun cas être tenu pour responsable des fautes
                    d&apos;orthographe présentes dans les textes fournis par le Client. Toutefois, le Client peut
                    confier la rédaction de ses contenus au Prestataire si nécessaire (prestation faisant l&apos;objet
                    d&apos;un devis à part). Les polices de caractères sont à insérer dans les envois (en cas de polices
                    non libres de droit, le coût de la licence sera facturé en sus). Les images sont à fournir dans une
                    taille et une résolution suffisantes. La qualité des images fournies par le client et leur rendu
                    sont indépendants de la création de la maquette.
                </p>
                <h2>Article 5 : Modification de la demande initiale par le client</h2>
                <p>
                    Toute nouvelle prestation non comprise dans le devis initial fera l&apos;objet d&apos;un nouveau
                    devis. Si la durée d&apos;une prestation dépassait de manière significative la durée prévue dans le
                    devis initial du fait de demandes émanant du client, de données non fournies avant
                    l&apos;établissement du devis, une facturation journalière, sur la base tarifaire journalière du
                    devis sera établie. Les modifications significatives, reprises de développement, retard dans la
                    prise de décision ou livraison tardive de documents par le client et nécessaires à la prestation,
                    repoussent d&apos;autant le délai de livraison établi entre les parties.
                </p>
                <h2>Article 6 : Cession des droits</h2>
                <p>
                    La cession des droits d&apos;utilisation et de modification des développements réalisés par le
                    prestataire s&apos;effectue à complet encaissement des montants facturés sauf dispositions
                    contraires mentionnées sur le devis et/ou la facture. Cette cession sera détaillée et précisée au
                    cas par cas sur chaque devis et/ou facture en fonction de ce qui aura été défini par les deux
                    parties. Sauf mention contraire précisée sur chaque devis et/ou facture, le règlement complet de la
                    facture entraîne la cession des droits d&apos;utilisation, de modification et de diffusion du
                    développement pour le Client.
                </p>
                <h2>Article 7 : Confidentialité</h2>
                <p>
                    Le Prestataire s&apos;engage, pendant toute la durée du Contrat et deux (2) ans après son terme ou
                    sa résiliation pour quelque cause que ce soit, à la confidentialité la plus totale concernant toute
                    donnée technique, financière ou commerciale appartenant au Bénéficiaire qui leur aura été
                    communiquée ou dont ils auront eu connaissance dans le cadre de l&apos;exécution du Contrat.
                </p>
                <p>Cette obligation de confidentialité ne s&apos;applique pas aux informations :</p>
                <ul>
                    <li>tombées dans le domaine public ;</li>
                    <li>
                        obtenues de manière licite d&apos;un tiers, sans violation d&apos;une obligation de
                        confidentialité ;
                    </li>
                    <li>
                        devant être divulguées sur réquisition d&apos;une autorité judiciaire ou administrative à
                        condition qu&apos;elles ne soient divulguées qu&apos;à ladite autorité judiciaire ou
                        administrative.
                    </li>
                </ul>
                <h2>Article 8 : Conditions de règlement</h2>
                <p>
                    Sauf mentions contraires dans le devis et/ou la facture, un acompte de 30% minimum du montant TTC
                    total sera demandé à la commande. Les prestations doivent être réglées au Prestataire aux dates
                    mentionnées sur le devis et/ou la facture client. Le client s&apos;engage à respecter les dates de
                    paiement mentionnées sur son devis et/ou sa facture et à retourner sa facture datée et signée avec
                    la mention « Lu et approuvé » ; cette disposition est aussi un élément essentiel du contrat.
                </p>
                <h2>Article 9 : Recouvrement des créances</h2>
                <p>
                    En cas de non paiement, l&apos;ensemble des frais de recouvrement sera à la charge du client. Si
                    nécessaire, le Prestataire pourra faire appel aux services d&apos;une société d&apos;affacturage
                    pour le recouvrement de ses créances clients.
                </p>
                <h2>Article 10 : La force majeure</h2>
                <p>
                    Les parties ne peuvent être considérées comme responsables ou ayant faillis à leurs obligations
                    contractuelles, lorsque le défaut d&apos;exécution des obligations respectives a pour origine la
                    force majeure ; le contrat entre les parties est suspendu jusqu&apos;à l&apos;extinction des causes
                    ayant engendrées la force majeure. La force majeure prend en compte des faits ou circonstances
                    irrésistibles, extérieurs aux parties, imprévisibles et indépendants de la volonté des parties,
                    malgré tous les efforts raisonnablement possibles pour les empêcher. Sont aussi considérés comme cas
                    de force majeure, le blocage des moyens de transports ou d&apos;approvisionnements, tremblements de
                    terre, incendies, tempêtes, inondations, foudre, l&apos;arrêt des réseaux de télécommunication, et
                    notamment tous les réseaux accessibles par internet, ou difficultés propres aux réseaux de
                    télécommunication extérieurs aux parties. La partie touchée par la force majeure en avisera
                    l&apos;autre dans les cinq (5) jours ouvrables suivant la date à laquelle elle en aura eu
                    connaissance. Les deux parties conviendront alors des conditions dans lesquelles l&apos;exécution du
                    contrat sera poursuivie.
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
                    Le contrat est soumis au droit Français. En cas de litiges, les parties s&apos;engagent à tout faire
                    pour régler leurs différends à l&apos;amiable. Au cas où une résolution amiable ne pourrait aboutir,
                    la juridiction compétente est celle de TOULOUSE.
                </p>
                <h2>Article 14 : Modalités d&apos;exécution - Obligations du Prestataire</h2>
                <p>La mission du PRESTATAIRE s&apos;exerce dans leurs locaux.</p>
                <p>
                    Le Prestataire s&apos;engage à consacrer le temps nécessaire à la mission et à réaliser cette
                    prestation en toute indépendance.
                </p>
                <p>
                    Il exécutera cette prestation avec toute la diligence nécessaire au bon accomplissement de leur
                    mission.
                </p>
                <p>
                    Il devra délivrer une prestation strictement conforme à l&apos;état de la technique en vigueur et
                    sera tenu d&apos;une obligation de résultat envers le Bénéficiaire.
                </p>
                <p>
                    Le Prestataire devra rendre compte chaque mois au Bénéficiaire de l&apos;avancement de la
                    réalisation de cette prestation, selon des modalités à convenir entre les Parties.
                </p>
                <p>
                    Ils informeront immédiatement le Bénéficiaire de l&apos;achèvement des livrables des présentes afin
                    de procéder aux opérations de recette.
                </p>
                <p>
                    En cas de dépassement du temps qui aura été convenu pour la réalisation de cette prestation, le
                    Prestataire s&apos;oblige à la réaliser sans pouvoir exiger de rémunération supplémentaire.
                </p>
                <h2>Article 15 : Recette des livrables</h2>
                <p>
                    Tous les livrables que Le Prestataire devra réaliser feront l&apos;objet d&apos;opérations de
                    recette (tests, recette provisoire, recette définitive, etc.).
                </p>
                <p>
                    En toute hypothèse, au terme de ces opérations de recette, la signature d&apos;un procès-verbal de
                    réception définitive par les Parties permettra d&apos;acter de la conformité de chaque livrable.
                </p>
                <h2>Article 16 : Exclusivité</h2>
                <p>
                    Pendant toute la durée du Contrat, le Prestataire s&apos;engage à développer l&apos;application web
                    exclusivement pour le compte du Bénéficiaire et s&apos;interdisent d&apos;en faire usage, ainsi que
                    des développements afférents à ladite application, pour leur propre compte ou pour le compte de
                    tiers, sans limitation de durée.
                </p>
                <h2>Article 17 : Assurances</h2>
                <p>
                    Le Prestataire atteste, par les présentes, avoir souscrit auprès d&apos;une compagnie
                    d&apos;assurances notoirement solvable, une police d&apos;assurances pour tous les risques liés à
                    l&apos;exécution de la prestation, et notamment avoir souscrit une assurance de responsabilité
                    civile professionnelle pour des montants suffisants.
                </p>
                <h2>Article 18 : Lutte contre le travail dissimulé</h2>
                <p>
                    Conformément à l&apos;article D. 8222-5 du Code du Travail, Le Prestataire s&apos;engage, le cas
                    échéant, à remettre au Bénéficiaire à la date de signature du Contrat et tous les six (6) mois
                    jusqu&apos;à la fin de son exécution :
                </p>
                <ul>
                    <li>
                        une attestation de fourniture des déclarations sociales et de paiement des cotisations et
                        contributions de sécurité sociale prévue à l&apos;article L. 243-15 du Code de la Sécurité
                        Sociale, émanant de l&apos;organisme de protection sociale chargé du recouvrement des
                        cotisations et des contributions et datant de moins de six (6) mois ;
                    </li>
                    <li>
                        si l&apos;immatriculation DU PRESTATAIRE au Registre du Commerce et des Sociétés ou au
                        Répertoire des Métiers est obligatoire, l&apos;un des documents suivants :
                        <ul>
                            <li>
                                un extrait de l&apos;inscription au Registre du Commerce et des Sociétés (K ou K bis) ;
                            </li>
                            <li>
                                une carte d&apos;identification justifiant de l&apos;inscription au répertoire des
                                métiers ;
                            </li>
                            <li>
                                un devis, un document publicitaire ou une correspondance professionnelle, à condition
                                qu&apos;y soient mentionnés le nom ou la dénomination sociale, l&apos;adresse complète
                                et le numéro d&apos;immatriculation au Registre du Commerce et des Sociétés ou au
                                Répertoire des Métiers ou à une liste ou un tableau d&apos;un ordre professionnel, ou la
                                référence de l&apos;agrément délivré par l&apos;autorité compétente ;
                            </li>
                            <li>
                                un récépissé du dépôt de déclaration auprès d&apos;un centre de formalités des
                                entreprises pour les personnes en cours d&apos;inscription.
                            </li>
                        </ul>
                    </li>
                </ul>
                <h2>Article 19 : INTUITU PERSONAE</h2>
                <p>
                    Le Contrat est conclu intuitu personae en considération du Prestataire et de leurs compétences
                    spécifiques.
                </p>
                <p>Il n&apos;est, en conséquence, ni transmissible, ni cessible par Le Prestataire à un tiers.</p>
                <h2>Article 20 : Intégralité de l&apos;accord</h2>
                <p>
                    Le Contrat constitue l&apos;intégralité de l&apos;accord entre les Parties aux présentes et annule
                    et remplace tous accords antérieurs, oraux ou écrits, entre les Parties quant à l&apos;objet des
                    présentes.
                </p>
            </Section>
        </>
    )
}

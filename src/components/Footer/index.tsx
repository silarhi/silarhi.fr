import Link from 'next/link'

import styles from './index.module.scss'

export default function Footer() {
    return (
        <footer className={`bg-primary text-white ${styles.footer}`}>
            <div className={`py-5 ${styles.topFooter}`}>
                <div className="container mx-auto px-4 text-center">
                    <h4>Développement d{"'"}applications Web à Toulouse et en France</h4>
                </div>
            </div>
            <div className={`py-4 ${styles.subFooter}`}>
                <div className="container mx-auto px-4">
                    <div>
                        ©&nbsp;{new Date().getFullYear()} SILARHI. Tous droits réservés &nbsp;|&nbsp;
                        <Link href={'/mentions-legales'}>Mentions légales</Link>
                        &nbsp;|&nbsp;
                        <Link href={'/conditions-generales-de-vente'}>CGV</Link>
                    </div>
                    <div>
                        {'Site développé par un '}
                        <a href="https://sainthillier.fr">développeur Web freelance à Toulouse</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

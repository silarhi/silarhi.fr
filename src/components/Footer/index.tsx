import Link from 'next/link'
import Container from 'react-bootstrap/Container'

import styles from './index.module.scss'

export default function Footer() {
    return (
        <footer className={`text-bg-primary ${styles.footer}`}>
            <div className={`py-5 ${styles.topFooter}`}>
                <Container className={'text-center'}>
                    <h4>Développement d{"'"}applications Web à Toulouse et en France</h4>
                </Container>
            </div>
            <div className={`py-4 ${styles.subFooter}`}>
                <div className="container">
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

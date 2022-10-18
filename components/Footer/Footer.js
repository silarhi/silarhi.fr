import Link from "next/link";
import styles from './Footer.module.scss';
import Container from "react-bootstrap/Container";


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`py-5 ${styles.footerTop}`}>
                <Container className={"text-center"}>
                    <h4>Développement d{"'"}applications Web à Toulouse et en France</h4>
                </Container>
            </div>
            <div className={`py-4 ${styles.footerBottom}`}>
                <div className="container">
                    <div className="column one">
                        <div className="copyright">
                            <div>
                                ©&nbsp;{new Date().getFullYear()} Silarhi. Tous droits réservés
                                &nbsp;|&nbsp;
                                <Link href={"/mentions-legales"}>
                                    <a>Mentions légales</a>
                                </Link>
                                &nbsp;|&nbsp;
                                <Link href={"/conditions-generales-de-vente"}>
                                    <a>CGV</a>
                                </Link>
                            </div>
                            <div>Site développé par un <a href="https://sainthillier.fr">développeur Web freelance à
                                Toulouse</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

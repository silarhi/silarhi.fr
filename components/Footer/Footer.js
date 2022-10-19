import Link from "next/link"
import Container from "react-bootstrap/Container"

import styles from './Footer.module.scss'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`py-5 text-bg-primary-dark`}>
        <Container className={"text-center"}>
          <h4>Développement d{"'"}applications Web à Toulouse et en France</h4>
        </Container>
      </div>
      <div className={`py-4 text-bg-primary`}>
        <div className="container">
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
    </footer>
  )
}

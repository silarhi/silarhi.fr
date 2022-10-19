import Footer from "components/Footer/Footer"
import Navbar from "components/Navbar/Navbar"
import PropTypes from "prop-types"

import styles from './DefaultLayout.module.scss'

export default function DefaultLayout({children, navbarInitialClass, navbarFloatingClass}) {
    return (
        <div className={styles.layout}>
            <Navbar floatingClass={navbarFloatingClass} initialClass={navbarInitialClass}/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

DefaultLayout.propTypes = {
  children: PropTypes.element,
  navbarInitialClass: PropTypes.string,
  navbarFloatingClass: PropTypes.string,
}

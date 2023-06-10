'use client'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

export default function DefaultLayout({ children }) {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.element,
}

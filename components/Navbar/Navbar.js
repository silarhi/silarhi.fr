import Link from "next/link"
import {useRouter} from "next/router"
import PropTypes from "prop-types"
import {useEffect, useLayoutEffect, useRef, useState} from "react"

import styles from './Navbar.module.scss'

export default function Navbar({initialClass, floatingClass}) {
  const router = useRouter()
  const ref = useRef(null)

  const [floating, setFloating] = useState(false)
  const [floatingStyle, setFloatingStyle] = useState({})
  const [navbarHeight, setNavbarHeight] = useState(56)

  useLayoutEffect(() => {
    setNavbarHeight(ref.current.clientHeight)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setFloating(window.scrollY > navbarHeight)
      if (window.scrollY > navbarHeight && window.scrollY <= 2 * navbarHeight) {
        setFloatingStyle({
          top: Math.round(window.scrollY - 2 * navbarHeight),
          opacity: 1 - (2 * navbarHeight - window.scrollY) / navbarHeight
        })
      } else {
        setFloatingStyle({})
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [navbarHeight, setFloating, setFloatingStyle])

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${styles.navbar} ${floating ? `${styles.floating} ${floatingClass}` : initialClass}`} style={floatingStyle} ref={ref}>
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className={`nav-link ${router.asPath === '/' ? 'active' : ''}`}>
                  Page 1
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page2">
                <a className={`nav-link ${router.asPath === '/page2' ? 'active' : ''}`}>
                  Page 2
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  floatingClass: 'navbar-light bg-light',
  initialClass: 'navbar-dark'
}

Navbar.propTypes = {
  floatingClass: PropTypes.string,
  initialClass: PropTypes.string,
}

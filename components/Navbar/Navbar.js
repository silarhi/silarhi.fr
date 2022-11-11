import cx from "classnames"
import Image from "next/future/image"
import Link from "next/link"
import {useRouter} from "next/router"
import PropTypes from "prop-types"
import logoDark from 'public/images/logo-dark-4096.png'
import logoLight from 'public/images/logo-light-4096.png'
import {useEffect, useLayoutEffect, useRef, useState} from "react"
import {Offcanvas} from "react-bootstrap"
import BsNavbar from "react-bootstrap/Navbar"

import CallToActionButton from "../CallToActionButton/CallToActionButton"
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

  const menuItems = [
    {
      path: '/#about',
      indexPath: '#about',
      label: 'À propos',
    },
    {
      path: '/#services',
      indexPath: '#services',
      label: 'Services',
    },
    {
      path: '/#chiffres',
      indexPath: '#chiffres',
      label: 'Chiffres',
    },
    {
      path: 'https://blog.silarhi.fr',
      label: 'Blog',
      target: '_blank',
    },
  ]

  return (
    <BsNavbar expand={"lg"} id={"app-navbar"} className={`navbar navbar-expand-lg fixed-top ${styles.navbar} ${floating ? `${styles.floating} ${floatingClass}` : initialClass}`} style={floatingStyle} ref={ref}>
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <Image src={logoLight} alt={"SILARHI"} height={60} className={"img-fluid"} />
            </a>
          </Link>
          <BsNavbar.Toggle />
          <BsNavbar.Offcanvas
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Image src={logoDark} alt={"SILARHI"} height={60} className={"img-fluid"} />
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                {menuItems.map((item, i) => (
                  <li className="nav-item" key={i}>
                    {router.asPath !== '/' && (
                      <Link href={item.path}>
                        <a className={cx({'nav-link': true, 'active': router.asPath === item.path})}>
                          {item.label}
                        </a>
                      </Link>
                    )}
                    {router.asPath === '/' && (
                      <a className={cx({
                        'nav-link': true,
                        'active': router.asPath === item.path
                      })} href={item.indexPath || item.path} target={item.target}>
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
                <li className="nav-item ms-lg-4">
                  <hr className={"d-block d-lg-none"} />
                  <CallToActionButton size={"lg"} variant={cx({'primary': ! floating, 'sub-primary': floating})}>Contact</CallToActionButton>
                </li>
              </ul>
            </Offcanvas.Body>
          </BsNavbar.Offcanvas>
        </div>
    </BsNavbar>
  )
}

Navbar.defaultProps = {
  floatingClass: 'navbar-dark bg-primary-dark',
  initialClass: 'navbar-dark'
}

Navbar.propTypes = {
  floatingClass: PropTypes.string,
  initialClass: PropTypes.string,
}

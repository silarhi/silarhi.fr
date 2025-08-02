import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import BsNavbar from 'react-bootstrap/Navbar'

import ActiveLink from '@/components/ActiveLink'
import CallToActionButton from '@/components/CallToActionButton'

import logo from '../../../public/images/logo-4096.png'
import styles from './index.module.scss'

interface MenuItem {
    path: string
    indexPath?: string
    label: string
    target?: string
}

interface NavbarProps {
    initialClass?: string
    floatingClass?: string
}

export default function Navbar({
    initialClass = 'navbar-dark',
    floatingClass = 'navbar-dark bg-primary-dark',
}: NavbarProps) {
    const ref = useRef<HTMLElement>(null)

    const [floating, setFloating] = useState<boolean>(false)
    const [floatingStyle, setFloatingStyle] = useState<CSSProperties>({})
    const [navbarHeight, setNavbarHeight] = useState<number>(56)

    const pathname = usePathname()

    useEffect(() => {
        if (ref.current) {
            setNavbarHeight(ref.current.clientHeight)
        }
    }, [])

    useEffect(() => {
        const onScroll = () => {
            setFloating(window.scrollY > navbarHeight)
            if (window.scrollY > navbarHeight && window.scrollY <= 2 * navbarHeight) {
                setFloatingStyle({
                    top: Math.round(window.scrollY - 2 * navbarHeight),
                    opacity: 1 - (2 * navbarHeight - window.scrollY) / navbarHeight,
                })
            } else {
                setFloatingStyle({})
            }
        }

        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [navbarHeight, setFloating, setFloatingStyle])

    const menuItems: MenuItem[] = [
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
            path: '/projets',
            label: 'Projets',
        },
        {
            path: 'https://blog.silarhi.fr',
            label: 'Blog',
            target: '_blank',
        },
    ]

    const isMainPage = pathname === '/' || pathname.startsWith('/#')

    return (
        <BsNavbar
            expand={'lg'}
            id={'app-navbar'}
            className={`navbar navbar-expand-lg fixed-top ${styles.navbar} ${
                floating ? `${styles.floating} ${floatingClass}` : initialClass
            }`}
            style={floatingStyle}
            ref={ref}
        >
            <div className="container">
                <Link href="/" className="navbar-brand">
                    <Image src={logo} alt={'SILARHI'} height={60} className={'img-fluid me-1'} />
                    SILARHI
                </Link>
                <BsNavbar.Toggle />
                <BsNavbar.Offcanvas placement="start">
                    <Offcanvas.Header closeButton>
                        <div className={'d-flex align-items-center'}>
                            <Image src={logo} alt={'SILARHI'} height={60} className={'img-fluid me-1'} />
                            <Offcanvas.Title as={'span'} className={'h2'}>
                                SILARHI
                            </Offcanvas.Title>
                        </div>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                            {menuItems.map((item, i) => (
                                <li className="nav-item" key={i}>
                                    {!isMainPage && (
                                        <ActiveLink href={item.path} className="nav-link" activeClassName={'active'}>
                                            {item.label}
                                        </ActiveLink>
                                    )}
                                    {isMainPage && (
                                        <ActiveLink
                                            href={item.indexPath ?? item.path}
                                            className="nav-link"
                                            target={item.target}
                                            activeClassName={'active'}
                                        >
                                            {item.label}
                                        </ActiveLink>
                                    )}
                                </li>
                            ))}
                            <li className="nav-item ms-lg-4">
                                <hr className={`${styles.offcanvasSeparator} d-block d-lg-none`} />
                                <CallToActionButton variant="sub-primary">Contact</CallToActionButton>
                            </li>
                        </ul>
                    </Offcanvas.Body>
                </BsNavbar.Offcanvas>
            </div>
        </BsNavbar>
    )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CSSProperties, useEffect, useRef, useState } from 'react'

import ActiveLink from '@/components/ActiveLink'
import CallToActionButton from '@/components/CallToActionButton'
import { cn } from '@/utils/lib'

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
    initialClass = 'text-white',
    floatingClass = 'text-white bg-primary-dark',
}: NavbarProps) {
    const ref = useRef<HTMLElement>(null)
    const [floating, setFloating] = useState<boolean>(false)
    const [floatingStyle, setFloatingStyle] = useState<CSSProperties>({})
    const [navbarHeight, setNavbarHeight] = useState<number>(56)
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

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
        <>
            <nav
                id="app-navbar"
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    styles.navbar,
                    floating ? cn(styles.floating, floatingClass) : initialClass
                )}
                style={floatingStyle}
                ref={ref}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-inherit hover:text-sub-primary transition-colors"
                        >
                            <Image src={logo} alt="SILARHI" height={60} className="h-12 w-auto" />
                            <span className="font-bold text-xl">SILARHI</span>
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden p-2 text-inherit"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                />
                            </svg>
                        </button>

                        {/* Desktop menu */}
                        <ul className="hidden lg:flex items-center space-x-6">
                            {menuItems.map((item, i) => (
                                <li key={i}>
                                    {!isMainPage && (
                                        <ActiveLink
                                            href={item.path}
                                            className="text-inherit hover:text-sub-primary transition-colors"
                                            activeClassName="text-sub-primary"
                                            target={item.target}
                                        >
                                            {item.label}
                                        </ActiveLink>
                                    )}
                                    {isMainPage && (
                                        <ActiveLink
                                            href={item.indexPath ?? item.path}
                                            className="text-inherit hover:text-sub-primary transition-colors"
                                            target={item.target}
                                            activeClassName="text-sub-primary"
                                        >
                                            {item.label}
                                        </ActiveLink>
                                    )}
                                </li>
                            ))}
                            <li className="ml-4">
                                <CallToActionButton variant="sub-primary">Contact</CallToActionButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
                    <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <Image src={logo} alt="SILARHI" height={60} className="h-12 w-auto" />
                                    <span className="font-bold text-2xl">SILARHI</span>
                                </div>
                                <button
                                    className="p-2 text-gray-600 hover:text-gray-900"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <ul className="space-y-1">
                                {menuItems.map((item, i) => (
                                    <li key={i}>
                                        {!isMainPage && (
                                            <ActiveLink
                                                href={item.path}
                                                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                                activeClassName="bg-primary-light text-white"
                                                target={item.target}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </ActiveLink>
                                        )}
                                        {isMainPage && (
                                            <ActiveLink
                                                href={item.indexPath ?? item.path}
                                                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                                target={item.target}
                                                activeClassName="bg-primary-light text-white"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </ActiveLink>
                                        )}
                                    </li>
                                ))}
                                <li className="pt-4 border-t border-gray-200">
                                    <CallToActionButton variant="sub-primary" className="w-full">
                                        Contact
                                    </CallToActionButton>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

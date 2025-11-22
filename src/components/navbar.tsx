'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CSSProperties, useEffect, useRef, useState } from 'react'

import { montserrat } from '@/app/fonts'
import ThemeToggle from '@/components/theme-toggle'
import ActiveLink from '@/components/ui/active-link'
import Button from '@/components/ui/button'
import { MenuToggle } from '@/components/ui/icons'
import logo from '@/public/images/logo-4096.png'
import { cn } from '@/utils/lib'

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

export default function Navbar({ initialClass, floatingClass }: NavbarProps) {
    const ref = useRef<HTMLElement>(null)
    const [floating, setFloating] = useState<boolean>(false)
    const [floatingStyle, setFloatingStyle] = useState<CSSProperties>({})
    const [navbarHeight, setNavbarHeight] = useState<number>(56)
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

    const pathname = usePathname()
    const isHomePage = pathname === '/'

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
            path: '/#presentation',
            indexPath: '#presentation',
            label: 'Présentation',
        },
        {
            path: '/#services',
            indexPath: '#services',
            label: 'Services',
        },
        {
            path: '/#methodologie',
            indexPath: '#methodologie',
            label: 'Méthodologie',
        },
        {
            path: '/#clients',
            indexPath: '#clients',
            label: 'Clients',
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

    // Get the correct href for menu items based on current page
    const getMenuItemHref = (item: MenuItem) => {
        // If on homepage, use indexPath if available (hash-only), otherwise use full path
        if (isMainPage && item.indexPath) {
            return item.indexPath
        }
        // If not on homepage, always use full path (with /) to navigate back to homepage
        return item.path
    }

    return (
        <>
            <nav
                id="app-navbar"
                className={cn(
                    'absolute top-0 right-0 left-0 z-50 transition-opacity',
                    {
                        fixed: floating,
                        'text-surface dark:text-foreground': floating || (isHomePage && !floating),
                        'text-dark dark:text-foreground': !floating && !isHomePage,
                        'bg-surface-dark': floating,
                        'bg-transparent': !floating,
                    },
                    initialClass && !floating && initialClass,
                    floatingClass && floating && floatingClass
                )}
                style={floatingStyle}
                ref={ref}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <Link
                            href="/"
                            className="hover:text-secondary flex items-center space-x-2 text-inherit transition-colors duration-300 hover:no-underline"
                        >
                            <Image
                                src={logo}
                                alt="SILARHI"
                                height={60}
                                priority={true}
                                className={cn('h-14 w-auto', {
                                    'max-h-10': floating,
                                })}
                            />
                            <span className={cn('text-xl', montserrat.className)}>SILARHI</span>
                        </Link>

                        {/* Mobile menu button and theme toggle */}
                        <div className="flex items-center space-x-2 xl:hidden">
                            <ThemeToggle className="text-inherit" />
                            <button
                                className="p-2 text-inherit"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <MenuToggle className="h-6 w-6" open={mobileMenuOpen} />
                            </button>
                        </div>

                        {/* Desktop menu */}
                        <ul className="hidden items-center space-x-9 xl:flex">
                            {menuItems.map((item, i) => (
                                <li key={i}>
                                    <ActiveLink
                                        href={getMenuItemHref(item)}
                                        className="hover:text-secondary text-inherit transition-colors duration-300 hover:no-underline"
                                        target={item.target}
                                        activeClassName="text-secondary"
                                    >
                                        {item.label}
                                    </ActiveLink>
                                </li>
                            ))}
                            <li>
                                <ThemeToggle className="text-inherit" />
                            </li>
                            <li>
                                <Button as="a" href="/contact" variant="secondary">
                                    Contact
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={cn('fixed inset-0 z-40 xl:hidden', { hidden: !mobileMenuOpen })}
                aria-hidden={!mobileMenuOpen}
            >
                {mobileMenuOpen && (
                    <div className="bg-overlay fixed inset-0" onClick={() => setMobileMenuOpen(false)} />
                )}
                <div
                    className={cn(
                        'bg-surface dark:bg-surface-dark fixed top-0 bottom-0 left-0 w-80 overflow-y-auto shadow-xl transition-transform duration-300',
                        {
                            'translate-x-0': mobileMenuOpen,
                            '-translate-x-full': !mobileMenuOpen,
                        }
                    )}
                >
                    <div className="p-4">
                        <ul className="mt-16 space-y-1">
                            {menuItems.map((item, i) => (
                                <li key={i}>
                                    <ActiveLink
                                        href={getMenuItemHref(item)}
                                        className="hover:bg-primary/10 dark:hover:bg-primary-light/10 block rounded px-4 py-3 text-inherit transition-colors"
                                        activeClassName="bg-primary-light text-surface dark:bg-primary dark:text-surface"
                                        target={item.target}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </ActiveLink>
                                </li>
                            ))}
                            <li className="border-border -mx-4 border-t px-4 py-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Thème</span>
                                    <ThemeToggle />
                                </div>
                            </li>
                            <li>
                                <Button as="a" href="/contact" variant="secondary" className="w-full">
                                    Contact
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

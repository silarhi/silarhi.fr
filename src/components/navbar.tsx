'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type CSSProperties, useEffect, useRef, useState } from 'react'

import { montserrat } from '@/app/fonts'
import ServicesMenu, { type NavService } from '@/components/services-menu'
import ThemeToggle from '@/components/theme-toggle'
import Button from '@/components/ui/button'
import { MenuToggle } from '@/components/ui/icons'
import logo from '@/public/images/logo-4096.png'
import { cn } from '@/utils/lib'

interface MenuItem {
    href: string
    label: string
    external?: boolean
}

const MENU_ITEMS: MenuItem[] = [
    { href: '/projets', label: 'Projets' },
    { href: '/technologies', label: 'Technologies' },
    { href: '/open-source', label: 'Open source' },
    { href: 'https://blog.silarhi.fr', label: 'Blog', external: true },
]

// A section stays highlighted on its detail pages (/projets/foo, /technologies/bar)
function isActivePath(pathname: string, item: MenuItem): boolean {
    return !item.external && (pathname === item.href || pathname.startsWith(`${item.href}/`))
}

function externalProps(item: MenuItem) {
    return item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

interface NavbarProps {
    /** Service pages listed under "Services", in editorial order */
    services: NavService[]
}

export default function Navbar({ services }: NavbarProps) {
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

    // The yellow accent only reads on the dark bars (home hero, floating bar, dark mode): on the light background of
    // the other pages it is 1.4:1, so the active and hovered links take the primary blue there
    const onLightBar = !floating && !isHomePage
    const accentClass = onLightBar ? 'text-primary dark:text-secondary' : 'text-secondary'
    const hoverAccentClass = onLightBar ? 'hover:text-primary dark:hover:text-secondary' : 'hover:text-secondary'

    return (
        <>
            <nav
                id="app-navbar"
                className={cn('absolute top-0 right-0 left-0 z-50 transition-opacity print:hidden', {
                    fixed: floating,
                    'text-surface dark:text-foreground': floating || (isHomePage && !floating),
                    'text-dark dark:text-foreground': !floating && !isHomePage,
                    'bg-surface-dark': floating,
                    'bg-transparent': !floating,
                })}
                style={floatingStyle}
                ref={ref}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <Link
                            href="/"
                            className={cn(
                                'flex items-center space-x-2 text-inherit transition-colors duration-300 hover:no-underline',
                                hoverAccentClass
                            )}
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
                        <div className="flex items-center space-x-2 lg:hidden">
                            <ThemeToggle className="text-inherit" />
                            <button
                                className={cn(
                                    'cursor-pointer rounded-lg p-2 text-inherit transition-colors duration-200',
                                    'hover:bg-primary/10 dark:hover:bg-primary-light/10'
                                )}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <MenuToggle className="h-5 w-5" open={mobileMenuOpen} />
                            </button>
                        </div>

                        {/* Desktop menu */}
                        <ul className="hidden items-center space-x-7 lg:flex xl:space-x-9">
                            <li>
                                <ServicesMenu
                                    services={services}
                                    accentClass={accentClass}
                                    hoverAccentClass={hoverAccentClass}
                                />
                            </li>
                            {MENU_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        {...externalProps(item)}
                                        aria-current={isActivePath(pathname, item) ? 'page' : undefined}
                                        className={cn(
                                            'text-inherit transition-colors duration-300 hover:no-underline',
                                            hoverAccentClass,
                                            { [accentClass]: isActivePath(pathname, item) }
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <ThemeToggle className="text-inherit" />
                            </li>
                            <li>
                                <Button
                                    as="a"
                                    href="/contact"
                                    variant="secondary"
                                    data-analytics-event="cta"
                                    data-analytics-location="header"
                                >
                                    Contact
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={cn('fixed inset-0 z-60 transition-[visibility] duration-200 lg:hidden', {
                    invisible: !mobileMenuOpen,
                })}
                aria-hidden={!mobileMenuOpen}
            >
                {/* Backdrop with fade transition */}
                <div
                    className={cn('bg-overlay fixed inset-0 transition-opacity duration-200', {
                        'opacity-100': mobileMenuOpen,
                        'opacity-0': !mobileMenuOpen,
                    })}
                    onClick={() => setMobileMenuOpen(false)}
                />
                {/* Slide panel */}
                <div
                    className={cn(
                        'bg-surface dark:bg-surface-dark fixed top-0 bottom-0 left-0 flex w-80 flex-col shadow-xl transition-transform duration-200 ease-in-out',
                        {
                            'translate-x-0': mobileMenuOpen,
                            '-translate-x-full': !mobileMenuOpen,
                        }
                    )}
                >
                    {/* Mobile menu header */}
                    <div className="border-border flex shrink-0 items-center justify-between border-b p-4">
                        <Link
                            href="/"
                            className="hover:text-secondary flex items-center space-x-2 text-inherit transition-colors duration-300 hover:no-underline"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Image src={logo} alt="SILARHI" height={40} className="h-10 w-auto" placeholder="blur" />
                            <span className={cn('text-lg', montserrat.className)}>SILARHI</span>
                        </Link>
                        <button
                            className={cn(
                                'cursor-pointer rounded-lg p-2 transition-colors duration-200',
                                'hover:bg-primary/10 dark:hover:bg-primary-light/10'
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <MenuToggle className="h-5 w-5" open={true} />
                        </button>
                    </div>

                    {/* Mobile menu body - scrollable */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-1">
                            <li className="border-border mb-2 border-b pb-3">
                                <p className="text-foreground/60 px-4 pt-1 pb-2 text-xs font-semibold tracking-wide uppercase">
                                    Services
                                </p>
                                <ul className="space-y-1">
                                    {services.map((service) => (
                                        <li key={service.slug}>
                                            <MobileMenuLink
                                                item={{ href: `/${service.slug}`, label: service.title }}
                                                active={pathname === `/${service.slug}`}
                                                onNavigate={() => setMobileMenuOpen(false)}
                                                className="py-2.5 text-sm"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {MENU_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <MobileMenuLink
                                        item={item}
                                        active={isActivePath(pathname, item)}
                                        onNavigate={() => setMobileMenuOpen(false)}
                                    />
                                </li>
                            ))}
                            <li className="border-border -mx-4 border-t px-4 py-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Thème</span>
                                    <ThemeToggle />
                                </div>
                            </li>
                            <li>
                                <Button
                                    as="a"
                                    href="/contact"
                                    variant="secondary"
                                    className="w-full"
                                    data-analytics-event="cta"
                                    data-analytics-location="mobile-menu"
                                >
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

interface MobileMenuLinkProps {
    item: MenuItem
    active: boolean
    onNavigate: () => void
    className?: string
}

function MobileMenuLink({ item, active, onNavigate, className }: MobileMenuLinkProps) {
    return (
        <Link
            href={item.href}
            {...externalProps(item)}
            aria-current={active ? 'page' : undefined}
            onClick={onNavigate}
            className={cn(
                'block rounded px-4 py-3 text-inherit transition-colors hover:no-underline',
                {
                    'bg-primary-light text-surface dark:bg-primary dark:text-surface': active,
                    'hover:bg-primary/10 dark:hover:bg-primary-light/10': !active,
                },
                className
            )}
        >
            {item.label}
        </Link>
    )
}

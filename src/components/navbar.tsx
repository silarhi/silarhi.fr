'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const menuToggleRef = useRef<HTMLButtonElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    const pathname = usePathname()
    const isHomePage = pathname === '/'

    // Past one bar height the navbar floats (fixed, dark); up to two bar heights it slides down and fades in.
    // The slide is written straight to the element once per frame: React only re-renders when `floating` flips.
    useEffect(() => {
        const nav = ref.current
        if (!nav) {
            return
        }

        // Measured before floating shrinks the logo
        const height = nav.clientHeight
        let frame = 0

        const update = () => {
            frame = 0
            const scrollY = window.scrollY
            setFloating(scrollY > height)
            if (scrollY > height && scrollY <= 2 * height) {
                nav.style.top = `${Math.round(scrollY - 2 * height)}px`
                nav.style.opacity = String(1 - (2 * height - scrollY) / height)
            } else {
                nav.style.top = ''
                nav.style.opacity = ''
            }
        }
        const onScroll = () => {
            if (!frame) {
                frame = requestAnimationFrame(update)
            }
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(frame)
        }
    }, [])

    // Open mobile menu: a modal dialog. Focus moves into it and stays there (Tab cycles), Escape closes it, the page
    // behind does not scroll; once closed, focus goes back to the toggle button.
    useEffect(() => {
        if (!mobileMenuOpen) {
            return
        }

        const toggleButton = menuToggleRef.current
        closeButtonRef.current?.focus()
        document.body.style.overflow = 'hidden'

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMobileMenuOpen(false)
                return
            }
            if (event.key !== 'Tab' || !mobileMenuRef.current) {
                return
            }

            const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last?.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first?.focus()
            }
        }
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
            toggleButton?.focus()
        }
    }, [mobileMenuOpen])

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
                                ref={menuToggleRef}
                                type="button"
                                className={cn(
                                    'cursor-pointer rounded-lg p-2 text-inherit transition-colors duration-200',
                                    'hover:bg-primary/10 dark:hover:bg-primary-light/10'
                                )}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Ouvrir le menu"
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-menu"
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
                // Visible at once when opening (so focus can move in), hidden only after the slide-out when closing
                className={cn('fixed inset-0 z-60 lg:hidden', {
                    'invisible transition-[visibility] duration-200': !mobileMenuOpen,
                })}
                inert={!mobileMenuOpen}
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
                    ref={mobileMenuRef}
                    id="mobile-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu"
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
                            ref={closeButtonRef}
                            type="button"
                            className={cn(
                                'cursor-pointer rounded-lg p-2 transition-colors duration-200',
                                'hover:bg-primary/10 dark:hover:bg-primary-light/10'
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Fermer le menu"
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

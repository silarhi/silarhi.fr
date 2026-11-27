'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

import { ChevronDown } from '@/components/ui/icons'
import { cn } from '@/utils/lib'

export interface NavService {
    slug: string
    title: string
    category?: string
}

interface ServicesMenuProps {
    services: NavService[]
    /** Text color of the button when a service page is open or the menu is expanded */
    accentClass: string
    hoverAccentClass: string
}

/**
 * "Services" entry of the desktop navbar: a disclosure button opening the list of service pages.
 * Closes on Escape (focus back on the button), on a click outside and when focus leaves it.
 */
export default function ServicesMenu({ services, accentClass, hoverAccentClass }: ServicesMenuProps) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const panelId = useId()
    const pathname = usePathname()
    const isActive = services.some((service) => pathname === `/${service.slug}`)

    useEffect(() => {
        if (!open) {
            return
        }

        const onPointerDown = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false)
                buttonRef.current?.focus()
            }
        }

        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [open])

    return (
        <div
            ref={containerRef}
            className="relative"
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpen(false)
                }
            }}
        >
            <button
                ref={buttonRef}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen(!open)}
                className={cn(
                    'flex cursor-pointer items-center gap-1 text-inherit transition-colors duration-300',
                    hoverAccentClass,
                    { [accentClass]: isActive || open }
                )}
            >
                Services
                <ChevronDown
                    aria-hidden="true"
                    className={cn('size-4 transition-transform duration-200', { 'rotate-180': open })}
                />
            </button>

            <div
                id={panelId}
                hidden={!open}
                className="bg-surface dark:bg-surface-elevated border-border text-foreground absolute top-full left-1/2 mt-4 w-md -translate-x-1/2 rounded-2xl border p-2 shadow-xl"
            >
                <ul>
                    {services.map((service) => {
                        const href = `/${service.slug}`
                        const isCurrent = pathname === href

                        return (
                            <li key={service.slug}>
                                <Link
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    className={cn(
                                        'block rounded-xl px-4 py-3 text-inherit transition-colors hover:no-underline',
                                        {
                                            'bg-primary/10 dark:bg-primary-light/20': isCurrent,
                                            'hover:bg-primary/5 dark:hover:bg-primary-light/10': !isCurrent,
                                        }
                                    )}
                                >
                                    <span className="text-primary dark:text-primary-light block text-xs font-semibold tracking-wide uppercase">
                                        {service.category ?? 'Service'}
                                    </span>
                                    <span className="block font-medium">{service.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="border-border mt-2 border-t px-4 pt-3 pb-2">
                    <Link
                        href="/#services"
                        onClick={() => setOpen(false)}
                        className="text-primary dark:text-primary-light text-sm font-medium"
                    >
                        Tout ce que nous faisons (et ne faisons pas)
                    </Link>
                </div>
            </div>
        </div>
    )
}

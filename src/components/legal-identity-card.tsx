import type { ReactNode } from 'react'

import { Landmark } from '@/components/ui/icons'
import { cn } from '@/utils/lib'

interface IdentityItemProps {
    label: string
    children: ReactNode
    wide?: boolean
}

function IdentityItem({ label, children, wide }: IdentityItemProps) {
    return (
        <div className={cn('bg-background border-border space-y-1 rounded-xl border p-4', { 'md:col-span-2': wide })}>
            <dt className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">{label}</dt>
            {children}
        </div>
    )
}

/**
 * Publisher and company card that opens the mentions légales.
 */
export default function LegalIdentityCard() {
    return (
        <section
            id="informations-legales"
            aria-labelledby="informations-legales-title"
            className="bg-surface dark:bg-surface-elevated border-border scroll-mt-24 rounded-2xl border p-5 shadow-sm sm:p-8"
        >
            <h2 id="informations-legales-title" className="mb-5 flex items-center gap-3 text-xl font-bold lg:text-2xl">
                <span
                    className="bg-primary flex size-9 shrink-0 items-center justify-center rounded-lg text-base text-white"
                    aria-hidden="true"
                >
                    <Landmark />
                </span>
                Informations légales
            </h2>
            <dl className="mb-0 grid grid-cols-1 gap-4 md:grid-cols-2">
                <IdentityItem label="Raison sociale">
                    <dd className="text-foreground text-lg font-bold">SILARHI</dd>
                    <dd className="text-foreground/75 text-sm">SARL au capital de 1&nbsp;000&nbsp;€</dd>
                </IdentityItem>
                <IdentityItem label="Directeur de la publication">
                    <dd className="text-foreground text-lg font-bold">Guillaume Sainthillier</dd>
                    <dd className="text-foreground/75 text-sm">Gérant</dd>
                </IdentityItem>
                <IdentityItem label="Siège social" wide>
                    <dd className="text-foreground font-medium">
                        116 Route d&apos;Espagne, HELIOS 4, BAT 113, BAL 411, 31100 Toulouse
                    </dd>
                </IdentityItem>
                <IdentityItem label="RCS et SIRET">
                    <dd className="text-foreground font-semibold tabular-nums">SIRET 841 541 667 00017</dd>
                    <dd className="text-foreground/75 text-sm">RCS Toulouse 841 541 667</dd>
                </IdentityItem>
                <IdentityItem label="TVA intracommunautaire">
                    <dd className="text-primary font-semibold tabular-nums">FR96841541667</dd>
                </IdentityItem>
                <IdentityItem label="Contact" wide>
                    <dd className="flex flex-wrap gap-x-6 gap-y-1">
                        <a href="mailto:hello@silarhi.fr" className="font-medium">
                            hello@silarhi.fr
                        </a>
                        <a href="tel:+33607275826" className="font-medium">
                            06 07 27 58 26
                        </a>
                    </dd>
                </IdentityItem>
            </dl>
        </section>
    )
}

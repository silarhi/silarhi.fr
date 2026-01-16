'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import Button from '@/components/ui/button'
import iconEnvelope from '@/icons/envelope_hem0.svg'

export default function FooterContactBanner() {
    const pathname = usePathname()

    if (pathname === '/contact') {
        return null
    }

    return (
        <div className="bg-secondary text-dark py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-center lg:justify-start lg:gap-8 lg:text-left">
                    <Image src={iconEnvelope} alt="Contactez nous" height={160} className="-mt-3xl mx-auto lg:mx-0" />
                    <p className="mb-0">
                        <span className="text-xl font-bold">Besoin d&#39;un renseignement ?</span>
                        <br />
                        <span className="font-medium">Vous avez un projet ?</span>
                    </p>
                    <span className="lg:ml-auto">
                        <Button as="a" href="/contact" variant="outline-dark">
                            Contactez-nous
                        </Button>
                    </span>
                </div>
            </div>
        </div>
    )
}

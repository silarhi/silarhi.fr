import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from '@/components/button'
import iconEnvelope from '@/icons/envelope_hem0.svg'
import logo from '@/public/images/logo-4096.png'
import { cn } from '@/utils/lib'

export default function Footer() {
    const pathname = usePathname()
    const linkClasses = 'text-inherit hover:text-secondary transition-colors'

    return (
        <footer
            className={cn('bg-dark text-surface', {
                'mt-20': pathname !== '/contact',
            })}
        >
            {pathname !== '/contact' && (
                <div className="bg-secondary text-dark py-6">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-center lg:justify-start lg:gap-8 lg:text-left">
                            <Image
                                src={iconEnvelope}
                                alt="Contactez nous"
                                height={160}
                                className="-mt-3xl mx-auto lg:mx-0"
                            />
                            <p className="mb-0">
                                <span className="text-xl font-bold">Besoin d’un renseignement ?</span>
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
            )}
            <div className="border-dark/10 border-t pt-6 pb-4">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-3">
                        <div>
                            <Link
                                href="/"
                                className="hover:text-secondary flex items-center space-x-2 text-inherit transition-colors"
                            >
                                <Image src={logo} alt="SILARHI" height={60} className={cn('h-14 w-auto')} />
                                <span className="text-xl">SILARHI</span>
                            </Link>
                            <p className="mb-0">
                                116 route d&#39;Espagne
                                <br />
                                BAL 411
                                <br />
                                31100 Toulouse
                            </p>
                        </div>
                        <div className="mt-4">
                            <h6 className="text-base font-bold">Navigation</h6>
                            <Link href="/contact" className={cn(linkClasses, 'block')}>
                                Contact
                            </Link>
                            <Link href="/mentions-legales" className={cn(linkClasses, 'block')}>
                                Mentions légales
                            </Link>
                            <Link href="/conditions-generales-de-vente" className={cn(linkClasses, 'block')}>
                                CGV
                            </Link>
                        </div>
                        <div className="mt-4">
                            <h6 className="text-base font-bold">Nos expertises techniques</h6>
                            <Link href="/projets/tag/symfony" className={cn(linkClasses, 'block')}>
                                Symfony
                            </Link>
                            <Link href="/projets/tag/apiplatform" className={cn(linkClasses, 'block')}>
                                Api Platform
                            </Link>
                            <Link href="/projets/tag/react" className={cn(linkClasses, 'block')}>
                                React
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-light/10 border-t py-4">
                <div className="container mx-auto px-4">
                    <p className="mb-0">
                        Site développé par{' '}
                        <a href="https://sainthillier.fr" className={linkClasses}>
                            Guillaume Sainthillier
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

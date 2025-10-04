import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-primary text-white [&_a]:text-white [&_a]:no-underline [&_a:hover]:text-orange-500 [&_a:hover]:underline">
            <div className="py-5 bg-black/20">
                <div className="container mx-auto px-4 text-center">
                    <h4 className="text-2xl">Développement d{"'"}applications Web à Toulouse et en France</h4>
                </div>
            </div>
            <div className="py-4 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div>
                        ©&nbsp;{new Date().getFullYear()} SILARHI. Tous droits réservés &nbsp;|&nbsp;
                        <Link href={'/mentions-legales'}>Mentions légales</Link>
                        &nbsp;|&nbsp;
                        <Link href={'/conditions-generales-de-vente'}>CGV</Link>
                    </div>
                    <div>
                        {'Site développé par un '}
                        <a href="https://sainthillier.fr">développeur Web freelance à Toulouse</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

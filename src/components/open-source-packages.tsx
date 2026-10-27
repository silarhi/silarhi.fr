import { ArrowRight } from '@/components/ui/icons'
import { getDocsUrl, type OpenSourcePackage } from '@/utils/open-source'

export interface OpenSourcePackagesProps {
    packages: OpenSourcePackage[]
}

// `rel` without `noreferrer`: the documentation sites see the visits coming from silarhi.fr in their analytics
export default function OpenSourcePackages({ packages }: OpenSourcePackagesProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
                <article key={pkg.slug} className="border-border bg-surface flex flex-col rounded-xl border p-6">
                    <h3 className="text-foreground mb-3 text-lg font-semibold">
                        <a href={getDocsUrl(pkg)} target="_blank" rel="noopener" className="hover:text-primary">
                            {pkg.name}
                        </a>
                    </h3>
                    <p className="text-foreground/80 mb-6 grow">{pkg.description}</p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                        <a
                            href={getDocsUrl(pkg)}
                            target="_blank"
                            rel="noopener"
                            className="text-primary hover:text-primary-dark group inline-flex min-h-6 items-center gap-1.5 font-medium"
                        >
                            Documentation
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href={`https://github.com/silarhi/${pkg.slug}`}
                            target="_blank"
                            rel="noopener"
                            className="text-foreground/80 hover:text-primary inline-flex min-h-6 items-center"
                        >
                            GitHub
                        </a>
                        <a
                            href={`https://packagist.org/packages/${pkg.composer}`}
                            target="_blank"
                            rel="noopener"
                            className="text-foreground/80 hover:text-primary inline-flex min-h-6 items-center"
                        >
                            Packagist
                        </a>
                    </div>
                </article>
            ))}
        </div>
    )
}

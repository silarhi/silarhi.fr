import { COMPANY_INFO } from '@/lib/schemas'
import { getDocsUrl, OPEN_SOURCE_PACKAGES } from '@/utils/open-source'
import { getAllProjects, getProjectFilterData } from '@/utils/project'
import { getAllServices } from '@/utils/service'
import { getBaseUrl } from '@/utils/url'

// Built once, from the same content as the pages and the sitemap
export const dynamic = 'force-static'

// One line per entry: front matter texts may be folded YAML spanning several lines
function oneLine(text: string): string {
    return text.replace(/\s+/g, ' ').trim()
}

function link(title: string, url: string, description?: string): string {
    return description ? `- [${title}](${url}): ${oneLine(description)}` : `- [${title}](${url})`
}

// https://llmstxt.org: a Markdown summary of the site for AI answer engines, linking its key pages
export async function GET() {
    const baseUrl = getBaseUrl()
    const [services, projects, { technologies }] = await Promise.all([
        getAllServices(),
        getAllProjects(),
        getProjectFilterData(),
    ])
    const foundingYear = new Date(COMPANY_INFO.foundingDate).getFullYear()

    const lines = [
        `# ${COMPANY_INFO.name}`,
        '',
        `> ${COMPANY_INFO.description}`,
        '',
        `${COMPANY_INFO.name} conçoit, reprend et maintient des logiciels métier sur mesure en PHP et Symfony depuis ${foundingYear}, depuis Toulouse et partout en France. L'agence est spécialisée dans les échanges bancaires (EBICS, CFONB, SEPA), la reprise d'applications existantes et la tierce maintenance applicative (TMA).`,
        '',
        '## Services',
        '',
        ...services.map((service) => link(service.title, `${baseUrl}/${service.slug}`, service.meta_description)),
        '',
        '## Études de cas',
        '',
        ...projects.map((project) =>
            link(`${project.title} (${project.client.name})`, `${baseUrl}/projets/${project.slug}`, project.excerpt)
        ),
        '',
        '## Open source',
        '',
        ...OPEN_SOURCE_PACKAGES.map((pkg) => link(pkg.name, getDocsUrl(pkg), pkg.description)),
        '',
        '## Contact',
        '',
        link('Contact', `${baseUrl}/contact`, `${COMPANY_INFO.email}, ${COMPANY_INFO.telephoneDisplay}`),
        link('Mentions légales', `${baseUrl}/mentions-legales`),
        '',
        '## Optional',
        '',
        link('Tous les projets', `${baseUrl}/projets`),
        ...technologies.map((technology) =>
            link(
                technology.name,
                `${baseUrl}/technologies/${technology.slug}`,
                `${technology.projectCount} projet${technology.projectCount > 1 ? 's' : ''}`
            )
        ),
        link('Blog PHP & Symfony', 'https://blog.silarhi.fr'),
        '',
    ]

    return new Response(lines.join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
}

/**
 * JSON-LD structured data component
 * Renders schema.org structured data as a script tag
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

interface JsonLdProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any> | Record<string, any>[]
}

export default function JsonLd({ data }: JsonLdProps) {
    const schemas = Array.isArray(data) ? data : [data]

    // Build a graph with all schemas
    const graph = {
        '@context': 'https://schema.org',
        '@graph': schemas,
    }

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}

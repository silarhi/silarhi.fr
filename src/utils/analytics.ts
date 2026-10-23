/**
 * Umami custom events, used as goals in the Umami dashboard (Reports → Goals, type "Event").
 *
 * Links are classified from their href by a single delegated listener (`<Analytics />`, mounted in the root layout), so
 * links rendered by MDX content or several components are tracked without wiring each one.
 *
 * Umami's declarative `data-umami-event` attribute is not used on links: its click handler calls preventDefault() and
 * then sets location.href, which turns a next/link navigation into a full page reload and drops the `download`
 * attribute of the CGV link. CTAs are marked with `data-cta-location` instead, read by the listener below.
 */

type EventData = Record<string, string>

interface AnalyticsEvent {
    name: string
    data?: EventData
}

declare global {
    interface Window {
        umami?: { track: (name: string, data?: EventData) => void }
    }
}

/**
 * Sends an event to Umami. The tracker is deferred, only loaded when NEXT_PUBLIC_UMAMI_WEBSITE_ID is set, and may be
 * blocked (ad blocker): events are then silently dropped.
 */
export function track(name: string, data?: EventData) {
    window.umami?.track(name, data)
}

/**
 * Decides whether a clicked link is a goal, and which one.
 */
function classifyLink(link: HTMLAnchorElement): AnalyticsEvent | null {
    if (link.protocol === 'tel:' || link.protocol === 'mailto:') {
        return { name: 'contact-direct', data: { channel: link.protocol === 'tel:' ? 'phone' : 'email' } }
    }
    if (link.origin !== window.location.origin) {
        return null
    }
    if (link.pathname === '/pdf/CGV.pdf') {
        return { name: 'cgv-download' }
    }
    const location = link.dataset.ctaLocation
    if (location) {
        return { name: 'cta', data: { location } }
    }
    const project = link.pathname.match(/^\/projets\/([^/]+)\/?$/)
    if (project && link.closest('[data-project-list]')) {
        return { name: 'project-view', data: { slug: decodeURIComponent(project[1]) } }
    }
    return null
}

export function trackLinkClick(e: MouseEvent) {
    const link = e.target instanceof Element ? e.target.closest('a[href]') : null
    const event = link instanceof HTMLAnchorElement ? classifyLink(link) : null
    if (event) {
        track(event.name, event.data)
    }
}

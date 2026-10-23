/**
 * Umami custom events, used as goals in the Umami dashboard (Reports → Goals, type "Event").
 *
 * A single delegated listener (`<Analytics />`, mounted in the root layout) handles every click:
 * - elements marked with `data-analytics-event="<name>"` send that event, with one property per other
 *   `data-analytics-<prop>="<value>"` attribute (CTAs, project links);
 * - links are also classified from their href, so links rendered by MDX content are tracked without wiring each one.
 *
 * These are our own attributes, not Umami's declarative `data-umami-event`: Umami intercepts clicks on those (it calls
 * preventDefault() then sets location.href), which turns a next/link navigation into a full page reload and drops the
 * `download` attribute of the CGV link. Ours are only read here, so the click goes on untouched. This module is also
 * the only one that knows about `window.umami`: the markup never names the analytics tool.
 */

const ATTRIBUTE_PREFIX = 'data-analytics-'

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
 * Reads the event declared on a marked element: `data-analytics-event` is the name, every other `data-analytics-*`
 * attribute is a property (key = the part after `data-analytics-`).
 */
function readMarkedEvent(element: Element): AnalyticsEvent {
    const data: EventData = {}
    for (const { name, value } of element.attributes) {
        if (name.startsWith(ATTRIBUTE_PREFIX) && name !== `${ATTRIBUTE_PREFIX}event`) {
            data[name.slice(ATTRIBUTE_PREFIX.length)] = value
        }
    }
    return {
        name: element.getAttribute(`${ATTRIBUTE_PREFIX}event`) as string,
        data: Object.keys(data).length > 0 ? data : undefined,
    }
}

/**
 * Decides whether a clicked link is a goal from its href, and which one.
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
    return null
}

export function trackClick(e: MouseEvent) {
    if (!(e.target instanceof Element)) {
        return
    }
    const marked = e.target.closest(`[${ATTRIBUTE_PREFIX}event]`)
    if (marked) {
        const event = readMarkedEvent(marked)
        track(event.name, event.data)
    }
    const link = e.target.closest('a[href]')
    const event = link instanceof HTMLAnchorElement ? classifyLink(link) : null
    if (event) {
        track(event.name, event.data)
    }
}

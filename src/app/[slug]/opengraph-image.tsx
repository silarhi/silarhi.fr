import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

import { getServiceBySlug } from '@/utils/service'

export const alt = "SILARHI, agence de développement d'applications Web PHP et Symfony à Toulouse et en France"
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

// Brand colors of globals.css (light theme): the image is rendered outside the page, without its CSS variables
const PRIMARY = '#2556cf'
const SECONDARY = '#f7d325'
const FOREGROUND = '#111827'
const DECORATION = '#eaf4fe'

// Same layout as the site-wide image (src/app/opengraph-image.png), with the service's title and category
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const service = await getServiceBySlug(slug)
    const [montserratBold, logo] = await Promise.all([
        readFile(join(process.cwd(), 'assets/fonts/Montserrat-Bold.ttf')),
        readFile(join(process.cwd(), 'public/images/logo-horizontal-4096.png'), 'base64'),
    ])

    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'white',
                fontFamily: 'Montserrat',
                position: 'relative',
            }}
        >
            {/* Decorative circles, echoing the network of the logo */}
            <div
                style={{
                    position: 'absolute',
                    top: -80,
                    right: -60,
                    width: 360,
                    height: 360,
                    borderRadius: 9999,
                    background: DECORATION,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: 260,
                    right: 150,
                    width: 140,
                    height: 140,
                    borderRadius: 9999,
                    background: DECORATION,
                }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '40px 80px 0' }}>
                {/* The logo file has transparent margins: the negative margin aligns its symbol with the text */}
                <img
                    src={`data:image/png;base64,${logo}`}
                    width={300}
                    height={150}
                    alt=""
                    style={{ marginLeft: -22 }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}>
                    <div
                        style={{
                            display: 'flex',
                            alignSelf: 'flex-start',
                            padding: '8px 22px',
                            borderRadius: 9999,
                            background: SECONDARY,
                            color: FOREGROUND,
                            fontSize: 26,
                            marginBottom: 24,
                        }}
                    >
                        {service?.category ?? 'Service'}
                    </div>
                    <div style={{ display: 'flex', color: FOREGROUND, fontSize: 60, lineHeight: 1.15, maxWidth: 980 }}>
                        {service?.title ?? 'SILARHI'}
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 110,
                    marginTop: 40,
                    padding: '0 80px',
                    background: PRIMARY,
                    color: 'white',
                    fontSize: 28,
                }}
            >
                <div style={{ display: 'flex' }}>Agence PHP & Symfony</div>
                <div style={{ display: 'flex' }}>silarhi.fr</div>
            </div>
        </div>,
        {
            ...size,
            fonts: [{ name: 'Montserrat', data: montserratBold, style: 'normal', weight: 700 }],
        }
    )
}

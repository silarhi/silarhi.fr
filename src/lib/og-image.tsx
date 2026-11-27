import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

// Brand colors of globals.css (light theme): the image is rendered outside the page, without its CSS variables
const PRIMARY = '#2556cf'
const SECONDARY = '#f7d325'
const FOREGROUND = '#111827'
const DECORATION = '#eaf4fe'

const WIDTH = 1200
const HEIGHT = 630

interface OgImageProps {
    badge: string
    title: string
}

// Long titles (some projects exceed 100 characters) get a smaller font to stay within three lines
function getTitleFontSize(title: string): number {
    if (title.length > 80) {
        return 44
    }
    if (title.length > 60) {
        return 52
    }
    return 60
}

// Same layout as the site-wide image (src/app/opengraph-image.png), with the page's title and a badge above it
export async function renderOgImage({ badge, title }: OgImageProps): Promise<ImageResponse> {
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
                {/* biome-ignore lint/performance/noImgElement: next/og draws plain <img> elements, next/image cannot run there */}
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
                        {badge}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            color: FOREGROUND,
                            fontSize: getTitleFontSize(title),
                            lineHeight: 1.15,
                            maxWidth: 980,
                        }}
                    >
                        {title}
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
            width: WIDTH,
            height: HEIGHT,
            fonts: [{ name: 'Montserrat', data: montserratBold, style: 'normal', weight: 700 }],
        }
    )
}

import { StaticImageData } from 'next/image'

// Client logos
import accelGeranciaLogo from '@/public/images/clients/accel-gerancia.svg'
import apsideLogo from '@/public/images/clients/apside.svg'
import arcosTechnologiesLogo from '@/public/images/clients/arcos-technologies.png'
import biotechDentalLogo from '@/public/images/clients/biotech-dental.png'
import boiteADesignLogo from '@/public/images/clients/boite-a-design.jpg'
import capitoleMobileLogo from '@/public/images/clients/capitole-mobile.gif'
import cimalisLogo from '@/public/images/clients/cimalis.gif'
import cube43Logo from '@/public/images/clients/cube43.svg'
import glucozLogo from '@/public/images/clients/glucoz.svg'
import guidapLogo from '@/public/images/clients/guidap.svg'
import investleaseLogo from '@/public/images/clients/investlease.png'
import lagenceLogo from '@/public/images/clients/lagence.svg'
import latecoreLogo from '@/public/images/clients/latecoere.png'
import noousLogo from '@/public/images/clients/noous.png'
import stillgeekLogo from '@/public/images/clients/stillgeek.png'

// Map image paths to imported static images
const imageMap: Record<string, StaticImageData> = {
    // Client logos
    '/images/clients/accel-gerancia.svg': accelGeranciaLogo,
    '/images/clients/apside.svg': apsideLogo,
    '/images/clients/arcos-technologies.png': arcosTechnologiesLogo,
    '/images/clients/biotech-dental.png': biotechDentalLogo,
    '/images/clients/boite-a-design.jpg': boiteADesignLogo,
    '/images/clients/capitole-mobile.gif': capitoleMobileLogo,
    '/images/clients/cimalis.gif': cimalisLogo,
    '/images/clients/cube.svg': cube43Logo, // Note: MDX references 'cube.svg' but file is 'cube43.svg'
    '/images/clients/cube43.svg': cube43Logo,
    '/images/clients/glucoz.svg': glucozLogo,
    '/images/clients/guidap.svg': guidapLogo,
    '/images/clients/investlease.png': investleaseLogo,
    '/images/clients/lagence.svg': lagenceLogo,
    '/images/clients/latecoere.png': latecoreLogo,
    '/images/clients/noous.png': noousLogo,
    '/images/clients/stillgeek.png': stillgeekLogo,
}

/**
 * Get an optimized static image from a path string.
 * Returns the imported StaticImageData if available, otherwise returns the original path.
 * This allows Next.js to optimize images at build time.
 */
export function getOptimizedImage(path: string | undefined): StaticImageData | string | undefined {
    if (!path) {
        return undefined
    }

    // Return the imported static image if available
    return imageMap[path] ?? path
}

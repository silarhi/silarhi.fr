import { Lato, Montserrat } from 'next/font/google'

export const lato = Lato({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    display: 'swap',
    variable: '--body-font',
})

// Variable font: one file covers every weight, listing weights only duplicates @font-face rules
export const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--brand-font',
})

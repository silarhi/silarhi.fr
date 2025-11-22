import { Lato, Montserrat } from 'next/font/google'

export const lato = Lato({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    display: 'swap',
    variable: '--body-font',
})

export const montserrat = Montserrat({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--brand-font',
})

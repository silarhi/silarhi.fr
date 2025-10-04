import { Lato, Montserrat } from 'next/font/google'

export const lato = Lato({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap',
})

export const montserrat = Montserrat({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    variable: '--body-font',
})

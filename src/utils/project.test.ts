import { describe, expect, it } from 'vitest'

import {
    formatProjectDuration,
    formatProjectPeriod,
    getCategorySlug,
    getEngagementTypeLabel,
    getIndustrySlug,
} from './project'

const utc = (date: string) => new Date(date)

describe('formatProjectPeriod', () => {
    it('shows the start year alone for an ongoing or single-year engagement', () => {
        expect(formatProjectPeriod({ date: utc('2019-04-02') }, 'year')).toBe('2019')
        expect(formatProjectPeriod({ date: utc('2019-04-02'), endDate: utc('2019-11-30') }, 'year')).toBe('2019')
    })

    it('shows a year range for an engagement over several years', () => {
        expect(formatProjectPeriod({ date: utc('2019-04-02'), endDate: utc('2024-07-15') }, 'year')).toBe('2019 – 2024')
    })

    it('shows the start month for an ongoing engagement', () => {
        expect(formatProjectPeriod({ date: utc('2019-04-02') }, 'month')).toBe('avril 2019')
    })

    it('repeats the year only when the engagement spans several years', () => {
        expect(formatProjectPeriod({ date: utc('2019-04-02'), endDate: utc('2024-07-15') }, 'month')).toBe(
            'avril 2019 – juillet 2024'
        )
        expect(formatProjectPeriod({ date: utc('2024-04-02'), endDate: utc('2024-07-15') }, 'month')).toBe(
            'avril – juillet 2024'
        )
    })

    it('shows a single month when the engagement started and ended in it', () => {
        expect(formatProjectPeriod({ date: utc('2024-07-01'), endDate: utc('2024-07-15') }, 'month')).toBe(
            'juillet 2024'
        )
    })

    it('formats UTC dates whatever the time zone of the process', () => {
        // Midnight UTC on January 1st is still December 31st west of Greenwich
        expect(formatProjectPeriod({ date: utc('2020-01-01') }, 'month')).toBe('janvier 2020')
    })
})

describe('formatProjectDuration', () => {
    it('counts in weeks under four weeks, one week at least', () => {
        expect(formatProjectDuration(utc('2024-01-01'), utc('2024-01-03'))).toBe('1 semaine')
        expect(formatProjectDuration(utc('2024-01-01'), utc('2024-01-21'))).toBe('3 semaines')
    })

    it('rounds to the month from four weeks', () => {
        expect(formatProjectDuration(utc('2024-01-01'), utc('2024-01-29'))).toBe('1 mois')
        expect(formatProjectDuration(utc('2024-01-01'), utc('2024-08-01'))).toBe('7 mois')
    })

    it('counts in years and remaining months from twelve months', () => {
        expect(formatProjectDuration(utc('2023-01-01'), utc('2024-01-01'))).toBe('1 an')
        expect(formatProjectDuration(utc('2020-01-01'), utc('2022-01-01'))).toBe('2 ans')
        expect(formatProjectDuration(utc('2020-01-01'), utc('2022-04-01'))).toBe('2 ans et 3 mois')
    })
})

describe('filter slugs', () => {
    it('turns a category into its query param value', () => {
        expect(getCategorySlug('Gestion documentaire')).toBe('gestion-documentaire')
        expect(getCategorySlug('Application  web')).toBe('application-web')
    })

    it('turns a client sector into its query param value, & included', () => {
        expect(getIndustrySlug('Services Juridiques & Finance')).toBe('services-juridiques-and-finance')
        expect(getIndustrySlug('Aéronautique')).toBe('aéronautique')
    })
})

describe('getEngagementTypeLabel', () => {
    it('gives the French label of each engagement type', () => {
        expect(getEngagementTypeLabel('project_based')).toBe('Projet à périmètre défini')
        expect(getEngagementTypeLabel('continuous_support')).toBe('Support continu')
        expect(getEngagementTypeLabel('consulting')).toBe('Consulting')
    })
})

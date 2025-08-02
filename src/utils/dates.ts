/**
 * Calculate the number of days since a given date
 */
export function getDaysSince(date: Date): number {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}

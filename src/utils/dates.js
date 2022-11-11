/**
 * @param from {Date}
 * @param to {Date|undefined}
 * @returns {number}
 */
export function getDaysSince(from, to = undefined) {
  to = to || new Date()
  console.log(to)

  return Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24))
}

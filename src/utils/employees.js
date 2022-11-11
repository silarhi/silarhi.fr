/**
 * @param employees {Array}
 * @returns {number}
 */
import {getDaysSince} from "./dates"

export function getTotalEmployeeCoffees( employees) {
  return employees.reduce((previousValue, employee) => {
    return previousValue + (employee.coffeesPerDay * getDaysSince(employee.from, employee.to))
  }, 0)
}

export function getTotalEmployeeHours( employees) {
  return employees.reduce((previousValue, employee) => {
    return previousValue + (employee.hoursPerDay * getDaysSince(employee.from, employee.to))
  }, 0)
}

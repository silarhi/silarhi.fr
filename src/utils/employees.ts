interface Employee {
    name: string
    from: Date
    to?: Date
    coffeesPerDay: number
    hoursPerDay: number
}

/**
 * Calculate total working days for an employee
 */
function getEmployeeWorkingDays(employee: Employee): number {
    const endDate = employee.to || new Date()
    const diffTime = Math.abs(endDate.getTime() - employee.from.getTime())

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Calculate total hours worked by all employees
 */
export function getTotalEmployeeHours(employees: Employee[]): number {
    return employees.reduce((total, employee) => {
        const workingDays = getEmployeeWorkingDays(employee)
        return total + workingDays * employee.hoursPerDay
    }, 0)
}

/**
 * Calculate total coffees consumed by all employees
 */
export function getTotalEmployeeCoffees(employees: Employee[]): number {
    return employees.reduce((total, employee) => {
        const workingDays = getEmployeeWorkingDays(employee)
        return total + workingDays * employee.coffeesPerDay
    }, 0)
}

import { DateTime, Info } from 'luxon'

export const getFirstDayOfMonth = (date: DateTime) => date.startOf('month')
export const getLastDayOfMonth = (date: DateTime) => date.endOf('month')

/**
 * Get all the days in a week. Since luxon weekdays start with Monday and
 * end with Sunday, this method does a workaround for starting with Sunday.
 *
 * @returns array with weekdays initials
 */
export const getWeekDays = (locale: string): string[] => {
  const weekdays = Info.weekdays('narrow', { locale })

  const [lastWeekday] = weekdays.slice(-1)
  const restWeekdays = weekdays.slice(0, 6)

  return [lastWeekday, ...restWeekdays]
}

export const getInitialCells = (date: DateTime): DateTime[] => {
  const initialCells: DateTime[] = []
  const firstDay = getFirstDayOfMonth(date)
  const firstDayWeekday = firstDay.weekday % 7

  for (let i = 0; i < firstDayWeekday; i++) {
    const cell = firstDay.minus({ days: firstDayWeekday - i })

    initialCells.push(cell)
  }

  return initialCells
}

export const getMonthCells = (date: DateTime): DateTime[] => {
  const monthCells: DateTime[] = []
  const firstDay = getFirstDayOfMonth(date)

  for (let i = 0; i < date.daysInMonth; i++) {
    const cell = firstDay.plus({ days: i })

    monthCells.push(cell)
  }

  return monthCells
}

export const getFinalCells = (date: DateTime): DateTime[] => {
  const finalCells: DateTime[] = []
  const lastDay = getLastDayOfMonth(date)
  const lastDayWeekday = lastDay.weekday % 7

  for (let i = 6; i > lastDayWeekday; i--) {
    const cell = lastDay.plus({ days: i - lastDayWeekday })

    finalCells.push(cell)
  }

  return finalCells.reverse()
}

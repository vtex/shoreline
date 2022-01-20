import { toUTCString } from './toUTCString'

export function generateDaysInMonthArray(
  month: number,
  monthStartsAt: number,
  weeksInMonth: number,
  year: number
) {
  return Array(weeksInMonth)
    .fill(1)
    .reduce((weeks: Date[][], _, weekIndex) => {
      const daysInWeek = [0, 1, 2, 3, 4, 5, 6].reduce(
        (days: Date[], dayIndex) => {
          const day = weekIndex * 7 + dayIndex - monthStartsAt + 2
          const utcDate = toUTCString(new Date(year, month, day))
          const cellDate = new Date(utcDate)

          return [...days, cellDate]
        },
        []
      )

      return [...weeks, daysInWeek]
    }, [])
}

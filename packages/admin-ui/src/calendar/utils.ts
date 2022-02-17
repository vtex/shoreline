import { useDateFormatter } from '../i18n'
import { setDay } from 'date-fns'

export interface WeekDay {
  readonly title: string
  readonly abbr: string
}

export function useWeekDays(weekStart: number): WeekDay[] {
  const dayFormatter = useDateFormatter({ weekday: 'narrow' })
  const dayFormatterLong = useDateFormatter({ weekday: 'long' })

  return [0, 1, 2, 3, 4, 5, 6].map((index) => {
    const dateDay = setDay(Date.now(), (index + weekStart) % 7)

    const day = dayFormatter.format(dateDay)
    const dayLong = dayFormatterLong.format(dateDay)

    return { title: dayLong, abbr: day } as const
  })
}

export function toUTCString(date: Date) {
  return date.toISOString().slice(0, 10)
}

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

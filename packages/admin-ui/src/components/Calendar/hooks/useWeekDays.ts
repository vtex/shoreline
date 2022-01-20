import { useDateFormatter } from '@vtex/admin-ui-intl'
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

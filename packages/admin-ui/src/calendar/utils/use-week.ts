import { useMemo } from 'react'
import { setDay } from 'date-fns'

import { useDateFormatter, useWeekStart } from '../../i18n'

const WEEK_INDEX_ARRAY = [0, 1, 2, 3, 4, 5, 6]

export function useWeek(): Week {
  const weekStart = useWeekStart()
  const weekDays = useWeekDays(weekStart)
  const week = useMemo<Week>(
    () => ({
      start: weekStart,
      days: weekDays,
    }),
    []
  )

  return week
}

function useWeekDays(weekStart: number): WeekDay[] {
  const dayFormatter = useDateFormatter({ weekday: 'narrow' })
  const dayFormatterLong = useDateFormatter({ weekday: 'long' })

  return WEEK_INDEX_ARRAY.map((index) => {
    const dayFromDate = setDay(Date.now(), (index + weekStart) % 7)
    const day = dayFormatter.format(dayFromDate)
    const dayLong = dayFormatterLong.format(dayFromDate)

    return { title: dayLong, abbr: day }
  })
}

export interface WeekDay {
  readonly title: string
  readonly abbr: string
}

export interface Week {
  start: number
  days: WeekDay[]
}

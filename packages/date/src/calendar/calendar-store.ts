import type { CalendarDate } from '@internationalized/date'
import { createCalendar } from '@internationalized/date'
import type { CalendarStateOptions } from '@react-stately/calendar'
import { useCalendarState } from '@react-stately/calendar'
import { Store } from '@vtex/shoreline-store'
import { useMemo } from 'react'

/**
 * Returns a calendar store
 */
export function useCalendarStore(props: UseCalendarStoreProps) {
  const state = useCalendarState({
    ...props,
    createCalendar,
  })

  return useMemo(() => new Store(state), [state])
}

export type UseCalendarStoreProps = Omit<
  CalendarStateOptions<CalendarDate>,
  'createCalendar'
>

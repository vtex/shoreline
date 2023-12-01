import { createCalendar } from '@internationalized/date'
import { useCalendarState } from '@react-stately/calendar'
import { Store } from '@vtex/shoreline-store'
import { useMemo } from 'react'

export function useCalendarStore(props: any) {
  const state = useCalendarState({
    ...props,
    createCalendar,
  })

  const store = useMemo(() => new Store(state), [state])

  return store
}

import type { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import React, { createContext, useContext } from 'react'
import type { Store } from '@vtex/shoreline-utils'
import { invariant } from '@vtex/shoreline-utils'

export const CalendarContext = createContext<Store<
  CalendarState | RangeCalendarState
> | null>(null)

export function CalendarProvider({ store, children }: any) {
  return (
    <CalendarContext.Provider value={store}>
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendarContext() {
  const context = useContext(CalendarContext)

  invariant(context, 'Calendar components must be wrapped by CalendarProvider')

  return context
}

export function isRangeCalendar(state: any): state is RangeCalendarState {
  if (state.highlightedRange) {
    return true
  }

  return false
}

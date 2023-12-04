import type { CalendarState } from '@react-stately/calendar'
import React, { createContext, useContext } from 'react'
import type { Store } from '@vtex/shoreline-store'
import { invariant } from '@vtex/shoreline-utils'

export const CalendarContext = createContext<Store<CalendarState> | null>(null)

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

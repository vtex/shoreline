import type { CalendarState } from '@react-stately/calendar'
import React, { createContext, useContext } from 'react'
import type { Store } from '@vtex/shoreline-store'

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

  if (!context) {
    throw new Error('Calendar components must be wrapped by CalendarProvider')
  }

  return context
}

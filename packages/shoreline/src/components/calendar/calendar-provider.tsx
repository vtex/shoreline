import type { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import type { Store } from '@vtex/shoreline-utils'
import { invariant } from '@vtex/shoreline-utils'

export const CalendarContext = createContext<Store<
  CalendarState | RangeCalendarState
> | null>(null)

/**
 * Calendar state provider
 */
export function CalendarProvider(props: CalendarProviderProps) {
  const { store, children } = props

  return (
    <CalendarContext.Provider value={store}>
      {children}
    </CalendarContext.Provider>
  )
}

export interface CalendarProviderOptions {
  /**
   * Calendar store
   */
  store: Store<CalendarState | RangeCalendarState> | null
  /**
   * Component children
   */
  children: ReactNode
}

export type CalendarProviderProps = CalendarProviderOptions

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

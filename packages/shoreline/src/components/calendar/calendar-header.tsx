import type { ReactNode } from 'react'

/**
 * Header of the calendar
 */
export function CalendarHeader(props: CalendarHeaderProps) {
  const { children } = props

  return <div data-sl-calendar-header>{children}</div>
}

export interface CalendarHeaderOptions {
  /**
   * Component children
   */
  children?: ReactNode
}

export type CalendarHeaderProps = CalendarHeaderOptions

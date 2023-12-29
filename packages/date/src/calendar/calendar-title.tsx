import type { ReactNode } from 'react'
import React from 'react'

/**
 * Title of the calendar
 */
export function CalendarTitle(props: CalendarTitleProps) {
  const { children } = props

  return <h2 data-sl-calendar-title>{children}</h2>
}

export interface CalendarTitleProps {
  children?: ReactNode
}

import type { ReactNode } from 'react'
import React from 'react'

import './calendar-title.css'

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

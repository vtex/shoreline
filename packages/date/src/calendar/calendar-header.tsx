import type { ReactNode } from 'react'
import React from 'react'

import './calendar-header.css'

/**
 * Header of the calendar
 */
export function CalendarHeader(props: CalendarHeaderProps) {
  const { children } = props

  return <div data-sl-calendar-header>{children}</div>
}

export interface CalendarHeaderProps {
  children?: ReactNode
}

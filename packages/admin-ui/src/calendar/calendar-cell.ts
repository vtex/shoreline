import { createComponent, createHook, useElement } from '@vtex/admin-ui-react'
import { Role } from 'reakit/Role'
import { ariaAttr, dataAttr } from '@vtex/admin-ui-util'
import { isWeekend } from 'date-fns'

import * as style from './calendar.style'
import type { CalendarStateReturn } from './calendar-state'

/**
 * Calendar cell behavior
 * @example
 * const calendarCellProps = useButton({})
 */
export const useCalendarCell = createHook<typeof Role, CalendarCellOptions>(
  (props) => {
    const { date, state, ...htmlProps } = props

    const { selectedDate } = state
    const isSelected = selectedDate.isSameDay(date)

    return {
      baseStyle: style.calendarCell,
      role: 'gridcell',
      'aria-selected': ariaAttr(isSelected),
      'data-weekend': dataAttr(isWeekend(date)),
      ...htmlProps,
    }
  }
)

/**
 * Calendar cell component
 * @example
 * <CalendarCell state={state} data={new Date()} />
 */
export const CalendarCell = createComponent<typeof Role, CalendarCellOptions>(
  (props) => {
    const calendarCellProps = useCalendarCell(props)

    return useElement(Role, calendarCellProps)
  }
)

export interface CalendarCellOptions {
  date: Date
  state: CalendarStateReturn
}

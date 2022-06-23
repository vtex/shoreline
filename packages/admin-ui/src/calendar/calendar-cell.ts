import { createComponent, createHook, useElement } from '@vtex/admin-ui-react'
import { Role } from 'reakit/Role'
import type { AnyObject } from '@vtex/admin-ui-util'
import { ariaAttr, dataAttr } from '@vtex/admin-ui-util'
import { isSameDay, isWeekend } from 'date-fns'

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

    const { dateValue } = state
    const isSelected = dateValue ? isSameDay(date, dateValue) : false

    const dataAttrs: AnyObject = {
      'data-weekend': dataAttr(isWeekend(date)),
    }

    return {
      baseStyle: style.calendarCell,
      role: 'gridcell',
      'aria-selected': ariaAttr(isSelected),
      ...dataAttrs,
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

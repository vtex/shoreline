import { jsx } from '@vtex/admin-ui-react'
import { Role } from 'reakit/Role'
import { ariaAttr, dataAttr } from '@vtex/admin-ui-util'
import { isSameDay, isWeekend } from 'date-fns'

import type { CalendarStateReturn } from './CalendarState'

/**
 * Calendar cell
 * @example
 * const state = useCalendarState()
 * cosnt <CalendarCell date={new Date()} state={state} />
 */
export const CalendarCell = jsx(Role)(
  {},
  {
    options: ['date', 'state'],
    memoize: true,
    useOptions(options: CalendarCellOptions, props) {
      const {
        date,
        state: { dateValue },
      } = options

      const isSelected = dateValue ? isSameDay(date, dateValue) : false

      return {
        role: 'gridcell',
        'data-weekend': dataAttr(isWeekend(date)),
        'aria-selected': ariaAttr(isSelected),
        ...props,
      }
    },
  }
)

export type CalendarCellOptions = {
  date: Date
  state: CalendarStateReturn
}

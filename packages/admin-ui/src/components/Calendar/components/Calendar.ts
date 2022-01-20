import { jsx } from '@vtex/admin-ui-react'
import { Role } from 'reakit/Role'

import type { CalendarStateReturn } from './CalendarState'

export interface CalendarOptions {
  state: CalendarStateReturn
}

/**
 * Calendar component
 * @example
 * const state = useCalendarState()
 * <Calendar state={state}>{... composites}</Calendar>
 */
export const Calendar = jsx(Role)(
  {},
  {
    options: ['state'],
    useOptions(options: CalendarOptions, props) {
      const {
        state: { calendarId },
      } = options

      return {
        role: 'group',
        'aria-labelledby': calendarId,
        ...props,
      }
    },
  }
)

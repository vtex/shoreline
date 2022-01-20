import { jsx } from '@vtex/admin-ui-react'
import { useDateFormatter } from '@vtex/admin-ui-intl'

import type { CalendarStateReturn } from './CalendarState'

export const CalendarHeaderTitle = jsx('h2')(
  {},
  {
    options: ['format', 'state'],
    useOptions(options: CalendarHeaderTitleOptions, props) {
      const {
        format = { month: 'long', year: 'numeric' },
        state: { calendarId, currentMonth },
      } = options

      return {
        ...props,
        id: calendarId,
        'aria-live': 'polite',
        children: useDateFormatter(format).format(currentMonth ?? new Date()),
      }
    },
  }
)

export interface CalendarHeaderTitleOptions {
  format?: Intl.DateTimeFormatOptions
  state: CalendarStateReturn
}

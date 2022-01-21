import { jsx } from '@vtex/admin-ui-react'
import { useDateFormatter } from '@vtex/admin-ui-intl'

import type { CalendarStateReturn } from './CalendarState'
import * as style from './Calendar.style'

export const CalendarHeaderTitle = jsx('h2')(style.calendarHeaderTitle, {
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
})

export interface CalendarHeaderTitleOptions {
  format?: Intl.DateTimeFormatOptions
  state: CalendarStateReturn
}

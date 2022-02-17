import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useDateFormatter } from '../i18n'

import type { CalendarStateReturn } from './calendar-state'
import * as style from './calendar.style'

export const CalendarHeaderTitle = createComponent<
  'h2',
  CalendarHeaderTitleOptions
>((props) => {
  const {
    format = { month: 'long', year: 'numeric' },
    state: { calendarId, currentMonth },
    ...htmlProps
  } = props

  return useElement('h2', {
    id: calendarId,
    'aria-live': 'polite',
    children: useDateFormatter(format).format(currentMonth ?? new Date()),
    baseStyle: style.calendarHeaderTitle,
    ...htmlProps,
  })
})

export interface CalendarHeaderTitleOptions {
  format?: Intl.DateTimeFormatOptions
  state: CalendarStateReturn
}

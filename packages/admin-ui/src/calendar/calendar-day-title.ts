import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Role } from 'reakit/Role'

import * as style from './calendar.style'
import type { CalendarStateReturn } from './calendar-state'

export const CalendarDayTitle = createComponent<
  typeof Role,
  CalendarDayTitleOptions
>((props) => {
  const {
    state: { weekDays },
    dayIndex,
    ...htmlProps
  } = props

  return useElement(Role, {
    baseStyle: style.calendarDayTitle,
    'aria-label': weekDays?.[dayIndex]?.title,
    ...htmlProps,
  })
})

export type CalendarDayTitleOptions = {
  dayIndex: number
  state: CalendarStateReturn
}

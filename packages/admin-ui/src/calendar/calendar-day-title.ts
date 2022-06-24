import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Role } from 'reakit/Role'

import * as style from './calendar.style'
import type { CalendarStateReturn } from './calendar-state'

export const CalendarDayTitle = createComponent<
  typeof Role,
  CalendarDayTitleOptions
>((props) => {
  const { state, dayIndex, ...htmlProps } = props
  const { week } = state

  const ariaLabel = week.days[dayIndex].title

  return useElement(Role, {
    baseStyle: style.calendarDayTitle,
    'aria-label': ariaLabel,
    ...htmlProps,
  })
})

export type CalendarDayTitleOptions = {
  dayIndex: number
  state: CalendarStateReturn
}

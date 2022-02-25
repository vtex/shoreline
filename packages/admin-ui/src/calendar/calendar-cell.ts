import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Role } from 'reakit/Role'
import { ariaAttr, dataAttr } from '@vtex/admin-ui-util'
import { isSameDay, isWeekend } from 'date-fns'

import * as style from './calendar.style'
import type { CalendarStateReturn } from './calendar-state'

export const CalendarCell = createComponent<typeof Role, CalendarCellOptions>(
  (props) => {
    const {
      date,
      state: { dateValue },
      ...htmlProps
    } = props

    const isSelected = dateValue ? isSameDay(date, dateValue) : false

    const customDataAttr = {
      'data-weekend': dataAttr(isWeekend(date)),
    } as any

    return useElement(Role, {
      baseStyle: style.calendarCell,
      role: 'gridcell',
      'aria-selected': ariaAttr(isSelected),
      ...customDataAttr,
      ...htmlProps,
    })
  }
)

export type CalendarCellOptions = {
  date: Date
  state: CalendarStateReturn
}

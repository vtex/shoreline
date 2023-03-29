import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { ariaAttr, htmlDataAttr } from '@vtex/admin-ui-util'
import { isSameDay, isWeekend } from 'date-fns'

import type { CalendarStateReturn } from './calendar-state'
import { calendarCellTheme } from './calendar.css'

export const CalendarCell = forwardRef(function CalendarCell(
  props: CalendarCellProps,
  ref: Ref<HTMLTableCellElement>
) {
  const {
    date,
    state: { dateValue },
    className = '',
    ...htmlProps
  } = props

  const isSelected = dateValue ? isSameDay(date, dateValue) : false

  const customDataAttr = {
    'data-weekend': htmlDataAttr(isWeekend(date)),
  } as any

  return (
    <td
      ref={ref}
      role="gridcell"
      className={cx(calendarCellTheme, className)}
      aria-selected={ariaAttr(isSelected)}
      {...customDataAttr}
      {...htmlProps}
    />
  )
})

export interface CalendarCellProps extends ComponentPropsWithoutRef<'td'> {
  date: Date
  state: CalendarStateReturn
}

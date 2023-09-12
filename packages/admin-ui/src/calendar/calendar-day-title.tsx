import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import type { CalendarStateReturn } from './calendar-state'
import { calendarDayTitleTheme } from './calendar.style'

export const CalendarDayTitle = forwardRef(function CalendarDayTitle(
  props: CalendarDayTitleProps,
  ref: Ref<HTMLTableCellElement>
) {
  const {
    state: { weekDays },
    dayIndex,
    className = '',
    ...htmlProps
  } = props

  return (
    <th
      ref={ref}
      aria-label={weekDays?.[dayIndex]?.title}
      className={cx(calendarDayTitleTheme, className)}
      {...htmlProps}
    />
  )
})

export interface CalendarDayTitleProps extends ComponentPropsWithoutRef<'th'> {
  dayIndex: number
  state: CalendarStateReturn
}

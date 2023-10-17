import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { useDateFormatter } from '../i18n'

import type { CalendarStateReturn } from './calendar-state'
import { calendarHeaderTitleTheme } from './calendar.style'

export const CalendarHeaderTitle = forwardRef(function CalendarHeaderTitle(
  props: CalendarHeaderTitleProps,
  ref: Ref<HTMLHeadingElement>
) {
  const {
    className = '',
    format = { month: 'long', year: 'numeric' },
    state: { calendarId, currentMonth },
    ...htmlProps
  } = props

  return (
    <h2
      ref={ref}
      id={calendarId}
      aria-live="polite"
      className={cx(calendarHeaderTitleTheme, className)}
      {...htmlProps}
    >
      {useDateFormatter(format).format(currentMonth ?? new Date())}
    </h2>
  )
})

export interface CalendarHeaderTitleProps
  extends Omit<ComponentPropsWithoutRef<'h2'>, 'children'> {
  format?: Intl.DateTimeFormatOptions
  state: CalendarStateReturn
}

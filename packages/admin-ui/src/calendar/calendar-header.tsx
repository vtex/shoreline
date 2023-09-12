import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { calendarHeaderTheme } from './calendar.style'

export const CalendarHeader = forwardRef(function CalendarHeader(
  props: CalendarHeaderProps,
  ref: Ref<HTMLElement>
) {
  const { className = '', ...htmlProps } = props

  return (
    <header
      ref={ref}
      className={cx(calendarHeaderTheme, className)}
      {...htmlProps}
    />
  )
})

export type CalendarHeaderProps = ComponentPropsWithoutRef<'header'>

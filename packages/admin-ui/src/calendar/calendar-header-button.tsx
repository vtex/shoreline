import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useMemo } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { Clickable } from 'reakit/Clickable'
import { callAllHandlers } from '@vtex/admin-ui-util'

import type { CalendarStateReturn } from './calendar-state'
import { calendarButtonTheme } from './calendar.css'

export const CalendarHeaderButton = forwardRef(function CalendarHeaderButton(
  props: CalendarHeaderButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    handler,
    state: {
      focusNextMonth,
      focusPreviousMonth,
      focusPreviousYear,
      focusNextYear,
    },
    onClick: htmlOnClick,
    className = '',
    ...htmlProps
  } = props

  const currentHandler = useMemo(
    () =>
      ({
        nextMonth: {
          handle: focusNextMonth,
          ariaLabel: 'Next Month',
        },
        previousMonth: {
          handle: focusPreviousMonth,
          ariaLabel: 'Previous Month',
        },
        nextYear: {
          handle: focusNextYear,
          ariaLabel: 'Next Year',
        },
        previousYear: {
          handle: focusPreviousYear,
          ariaLabel: 'Previous Year',
        },
      }[handler]),
    [focusNextMonth, focusPreviousMonth, focusNextYear, focusPreviousYear]
  )

  return (
    <Clickable
      ref={ref}
      className={cx(calendarButtonTheme, className)}
      aria-label={currentHandler?.ariaLabel}
      onClick={callAllHandlers(htmlOnClick, currentHandler?.handle)}
      {...htmlProps}
    />
  )
})

export type CalendarHeaderButtonHandler =
  | 'nextMonth'
  | 'previousMonth'
  | 'nextYear'
  | 'previousYear'

export interface CalendarHeaderButtonOptions {
  handler: CalendarHeaderButtonHandler
  state: CalendarStateReturn
}

export type CalendarHeaderButtonProps = ComponentPropsWithoutRef<'button'> & {
  handler: CalendarHeaderButtonHandler
  state: CalendarStateReturn
}

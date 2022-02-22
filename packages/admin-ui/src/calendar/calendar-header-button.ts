import { useMemo } from 'react'
import { Clickable } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { callAllHandlers } from '@vtex/admin-ui-util'

import * as style from './calendar.style'
import type { CalendarStateReturn } from './calendar-state'

export const CalendarHeaderButton = createComponent<
  typeof Clickable,
  CalendarHeaderButtonOptions
>((props) => {
  const {
    handler,
    state: {
      focusNextMonth,
      focusPreviousMonth,
      focusPreviousYear,
      focusNextYear,
    },
    onClick: htmlOnClick,
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

  return useElement(Clickable, {
    baseStyle: style.calendarButton,
    'aria-label': currentHandler?.ariaLabel,
    onClick: callAllHandlers(htmlOnClick, currentHandler?.handle),
    ...htmlProps,
  })
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

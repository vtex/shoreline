import { useMemo } from 'react'
import { Clickable } from 'reakit/Clickable'
import { createComponent, useElement, createHook } from '@vtex/admin-ui-react'
import { callAllHandlers } from '@vtex/admin-ui-util'

import * as style from './calendar.style'
import type { CalendarStateReturn } from './calendar-state'

const useCalendarHeaderButton = createHook<
  typeof Clickable,
  CalendarHeaderButtonOptions
>((props) => {
  const { handler, state, onClick: htmlOnClick, ...htmlProps } = props
  const { focusNextMonth, focusPreviousMonth } = state

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
      }[handler]),
    [focusNextMonth, focusPreviousMonth]
  )

  return {
    baseStyle: style.calendarButton,
    'aria-label': currentHandler?.ariaLabel,
    onClick: callAllHandlers(htmlOnClick, currentHandler?.handle),
    ...htmlProps,
  }
})

export const CalendarHeaderButton = createComponent<
  typeof Clickable,
  CalendarHeaderButtonOptions
>((props) => {
  const calendarHeaderButtonProps = useCalendarHeaderButton(props)

  return useElement(Clickable, calendarHeaderButtonProps)
})

export type CalendarHeaderButtonHandler = 'nextMonth' | 'previousMonth'

export interface CalendarHeaderButtonOptions {
  handler: CalendarHeaderButtonHandler
  state: CalendarStateReturn
}

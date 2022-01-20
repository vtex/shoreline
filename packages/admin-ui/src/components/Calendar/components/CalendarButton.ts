import { useMemo } from 'react'
import { Clickable } from 'reakit'
import { jsx } from '@vtex/admin-ui-react'
import { callAllHandlers } from '@vtex/admin-ui-util'

import type { CalendarStateReturn } from './CalendarState'

/**
 * Calendar button that triggers month & year switches
 * @example
 * const state = useCalendarState()
 * <CalendarButton state={state} goto='nextMonth' />
 */
export const CalendarButton = jsx(Clickable)(
  {},
  {
    options: ['goto', 'state'],
    memoize: true,
    useOptions(options: CalendarButtonOptions, props) {
      const {
        goto,
        state: {
          focusNextMonth,
          focusPreviousMonth,
          focusPreviousYear,
          focusNextYear,
        },
      } = options

      const { onClick: htmlOnClick, ...htmlProps } = props

      const handlers = useMemo(
        () => ({
          nextMonth: {
            handler: focusNextMonth,
            ariaLabel: 'Next Month',
          },
          previousMonth: {
            handler: focusPreviousMonth,
            ariaLabel: 'Previous Month',
          },
          nextYear: {
            handler: focusNextYear,
            ariaLabel: 'Next Year',
          },
          previousYear: {
            handler: focusPreviousYear,
            ariaLabel: 'Previous Year',
          },
        }),
        [focusNextMonth, focusPreviousMonth, focusNextYear, focusPreviousYear]
      )

      return {
        'aria-label': handlers[goto]?.ariaLabel,
        onClick: callAllHandlers(htmlOnClick, handlers[goto]?.handler),
        ...htmlProps,
      }
    },
  }
)

export type CalendarGoto =
  | 'nextMonth'
  | 'previousMonth'
  | 'nextYear'
  | 'previousYear'

export interface CalendarButtonOptions {
  goto: CalendarGoto
  state: CalendarStateReturn
}

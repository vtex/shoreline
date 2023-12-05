import React, { useMemo, useRef } from 'react'
import type { AriaRangeCalendarProps } from '@react-aria/calendar'
import { useRangeCalendar } from '@react-aria/calendar'
import { useRangeCalendarState } from '@react-stately/calendar'
import { createCalendar, type CalendarDate } from '@internationalized/date'
import { useLocale, IconButton } from '@vtex/shoreline-components'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'
import { Store } from '@vtex/shoreline-store'

import { CalendarGrid } from './calendar-grid'
import { CalendarProvider } from './calendar-provider'

import './calendar.css'

/**
 * Allow users to select a date
 * @example
 * <Calendar />
 */
export function RangeCalendar(props: RangeCalendarProps) {
  const locale = useLocale()
  const ref = useRef(null)
  const state = useRangeCalendarState({
    ...props,
    createCalendar,
    locale,
  })

  const store = useMemo(() => new Store(state), [state])

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, store.state, ref)

  return (
    <CalendarProvider store={store}>
      <div ref={ref} data-sl-calendar {...calendarProps}>
        <div data-sl-calendar-header>
          <IconButton
            label={prevButtonProps['aria-label']}
            variant="tertiary"
            disabled={prevButtonProps.isDisabled}
            onClick={prevButtonProps.onPress as any}
            onFocus={prevButtonProps.onFocusChange as any}
          >
            <IconCaretLeft />
          </IconButton>
          <h2 data-sl-calendar-title>{title}</h2>
          <IconButton
            label={nextButtonProps['aria-label']}
            variant="tertiary"
            disabled={nextButtonProps.isDisabled}
            onClick={nextButtonProps.onPress as any}
            onFocus={nextButtonProps.onFocusChange as any}
          >
            <IconCaretRight />
          </IconButton>
        </div>
        <CalendarGrid />
      </div>
    </CalendarProvider>
  )
}

export type RangeCalendarProps = Omit<
  AriaRangeCalendarProps<CalendarDate>,
  'createCalendar' | 'locale'
>

import type { AriaRangeCalendarProps } from '@react-aria/calendar'
import { useRangeCalendar } from '@react-aria/calendar'
import { useRangeCalendarState } from '@react-stately/calendar'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'
import { Store } from '@vtex/shoreline-utils'
import React, { useMemo, useRef } from 'react'

import { CalendarGrid } from '../calendar/calendar-grid'
import { CalendarHeader } from '../calendar/calendar-header'
import { CalendarProvider } from '../calendar/calendar-provider'
import { CalendarTitle } from '../calendar/calendar-title'
import { IconButton } from '../icon-button'
import { useLocale } from '../locale'
import type { DateValue } from '../utils'
import { createCalendar } from '../utils'

/**
 * Allow users to select a date range
 * @status stable
 * @example
 * <RangeCalendar />
 */
export function RangeCalendar<T extends DateValue>(
  props: RangeCalendarProps<T>
) {
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
    <CalendarProvider store={store as any}>
      <div ref={ref} data-sl-range-calendar {...calendarProps}>
        <CalendarHeader>
          <IconButton
            label={prevButtonProps['aria-label']}
            variant="tertiary"
            disabled={prevButtonProps.isDisabled}
            onClick={prevButtonProps.onPress as any}
            onFocus={prevButtonProps.onFocusChange as any}
          >
            <IconCaretLeft />
          </IconButton>
          <CalendarTitle>{title}</CalendarTitle>
          <IconButton
            label={nextButtonProps['aria-label']}
            variant="tertiary"
            disabled={nextButtonProps.isDisabled}
            onClick={nextButtonProps.onPress as any}
            onFocus={nextButtonProps.onFocusChange as any}
          >
            <IconCaretRight />
          </IconButton>
        </CalendarHeader>
        <CalendarGrid />
      </div>
    </CalendarProvider>
  )
}

export type RangeCalendarOptions<T extends DateValue> = Omit<
  AriaRangeCalendarProps<T>,
  'createCalendar' | 'locale'
>

export type RangeCalendarProps<T extends DateValue> = RangeCalendarOptions<T>

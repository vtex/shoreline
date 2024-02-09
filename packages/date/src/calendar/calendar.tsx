import React, { useMemo } from 'react'
import type { AriaCalendarProps, DateValue } from '@react-aria/calendar'
import { useCalendar } from '@react-aria/calendar'
import { useLocale, IconButton } from '@vtex/shoreline-components'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'
import { Store } from '@vtex/shoreline-utils'
import { useCalendarState } from '@react-stately/calendar'

import { CalendarGrid } from './calendar-grid'
import { CalendarProvider } from './calendar-provider'
import { CalendarHeader } from './calendar-header'
import { CalendarTitle } from './calendar-title'
import { createCalendar } from '../utils'

/**
 * Allow users to select a date
 * @playground
 * @kind date
 * @example
 * <Calendar />
 */
export function Calendar<T extends DateValue>(props: CalendarProps<T>) {
  const locale = useLocale()
  const state = useCalendarState({
    ...props,
    createCalendar,
    locale,
  })

  const store = useMemo(() => new Store(state), [state])

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, store.state)

  return (
    <CalendarProvider store={store}>
      <div data-sl-calendar {...calendarProps}>
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

export type CalendarProps<T extends DateValue> = Omit<
  AriaCalendarProps<T>,
  'createCalendar' | 'locale'
>

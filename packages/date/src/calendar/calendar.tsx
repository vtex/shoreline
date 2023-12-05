import React, { useMemo } from 'react'
import type { AriaCalendarProps } from '@react-aria/calendar'
import { useCalendar } from '@react-aria/calendar'
import { useLocale, IconButton } from '@vtex/shoreline-components'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'
import { Store } from '@vtex/shoreline-store'
import { useCalendarState } from '@react-stately/calendar'

import { CalendarGrid } from './calendar-grid'
import { CalendarProvider } from './calendar-provider'
import { CalendarHeader } from './calendar-header'
import { CalendarTitle } from './calendar-title'
import type { CalendarDate } from '../utils'
import { createCalendar } from '../utils'
import './calendar.css'

/**
 * Allow users to select a date
 * @example
 * <Calendar />
 */
export function Calendar(props: CalendarProps) {
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

export type CalendarProps = Omit<
  AriaCalendarProps<CalendarDate>,
  'createCalendar' | 'locale'
>

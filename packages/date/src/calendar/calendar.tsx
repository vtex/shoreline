import React from 'react'
import { useCalendar } from '@react-aria/calendar'
import { useCalendarState } from '@react-stately/calendar'
import { createCalendar } from '@internationalized/date'
import { useLocale, IconButton } from '@vtex/shoreline-components'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'
import { CalendarGrid } from './calendar-grid'

import './calendar.css'

export function Calendar(props: any) {
  const locale = useLocale()
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  })

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state)

  console.log(prevButtonProps)

  return (
    <div data-sl-calendar {...calendarProps}>
      <div data-sl-calendar-header>
        <IconButton
          label="Previous month"
          variant="tertiary"
          disabled={prevButtonProps.isDisabled}
          aria-label={prevButtonProps['aria-label']}
          onClick={prevButtonProps.onPress as any}
          onFocus={prevButtonProps.onFocusChange as any}
        >
          <IconCaretLeft />
        </IconButton>
        <h2 data-sl-calendar-title>{title}</h2>
        <IconButton
          label="Next month"
          variant="tertiary"
          disabled={nextButtonProps.isDisabled}
          aria-label={nextButtonProps['aria-label']}
          onClick={nextButtonProps.onPress as any}
          onFocus={nextButtonProps.onFocusChange as any}
        >
          <IconCaretRight />
        </IconButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  )
}

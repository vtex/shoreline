import React from 'react'
import { useCalendar } from '@react-aria/calendar'
import { createCalendar } from '@internationalized/date'
import { useLocale, IconButton } from '@vtex/shoreline-components'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'
import { I18nProvider } from '@react-aria/i18n'

import { CalendarGrid } from './calendar-grid'
import { CalendarProvider } from './calendar-provider'
import { useCalendarStore } from './calendar-store'

import './calendar.css'

export function Calendar(props: any) {
  const locale = useLocale()
  const store = useCalendarStore({
    ...props,
    locale,
    createCalendar,
  })

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, store.state)

  return (
    <CalendarProvider store={store}>
      <I18nProvider locale={locale}>
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
          <CalendarGrid />
        </div>
      </I18nProvider>
    </CalendarProvider>
  )
}

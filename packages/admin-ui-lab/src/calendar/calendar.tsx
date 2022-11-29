import React, { useRef } from 'react'
import { useCalendar, useLocale } from 'react-aria'
import { useCalendarState } from 'react-stately'
import { createCalendar } from '@internationalized/date'
import { Button, Heading, IconArrowLeft, IconArrowRight } from '@vtex/admin-ui'

import { CalendarGrid } from './calendar-grid'
import { calendarHeaderTheme } from './calendar.css'

export function Calendar(props: any) {
  const { locale } = useLocale()
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  })

  const ref = useRef(null)
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state)

  console.log({
    prevButtonProps,
  })

  return (
    <div {...calendarProps} ref={ref} className="calendar">
      <header className={calendarHeaderTheme}>
        <Button
          aria-label={prevButtonProps['aria-label']}
          disabled={prevButtonProps.isDisabled}
          onBlur={prevButtonProps.onBlur}
          onFocus={prevButtonProps.onFocus}
          onClick={(e: any) => prevButtonProps.onPress?.(e)}
          variant="neutralTertiary"
          icon={<IconArrowLeft />}
        />
        <Heading as="h2">{title}</Heading>
        <Button
          aria-label={nextButtonProps['aria-label']}
          disabled={nextButtonProps.isDisabled}
          onBlur={nextButtonProps.onBlur}
          onFocus={nextButtonProps.onFocus}
          onClick={(e: any) => nextButtonProps.onPress?.(e)}
          variant="neutralTertiary"
          icon={<IconArrowRight />}
        />
      </header>
      <CalendarGrid state={state} />
    </div>
  )
}

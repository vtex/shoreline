import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { IconCaretLeft, IconCaretRight } from '@vtex/phosphor-icons'

import type { CalendarStateReturn } from './calendar-state'
import { CalendarHeaderButton } from './calendar-header-button'
import { CalendarGrid } from './calendar-grid'
import { CalendarHeaderTitle } from './calendar-header-title'
import { CalendarDayTitle } from './calendar-day-title'
import { CalendarHeader } from './calendar-header'
import { CalendarCell } from './calendar-cell'
import { CalendarCellButton } from './calendar-cell-button'
import { Abbr } from '../abbr'
import { calendarTheme } from './calendar.style'

export const Calendar = forwardRef(function Calendar(
  props: CalendarProps,
  ref: Ref<HTMLDivElement>
) {
  const { state, className = '', ...htmlProps } = props

  return (
    <div
      ref={ref}
      className={cx(calendarTheme, className)}
      role="group"
      aria-labelledby={state.calendarId}
      {...htmlProps}
    >
      <CalendarHeader>
        <CalendarHeaderButton state={state} handler="previousMonth">
          <IconCaretLeft />
        </CalendarHeaderButton>
        <CalendarHeaderTitle state={state} />
        <CalendarHeaderButton state={state} handler="nextMonth">
          <IconCaretRight />
        </CalendarHeaderButton>
      </CalendarHeader>
      <CalendarGrid state={state}>
        <thead>
          <tr>
            {state?.weekDays?.map((day, dayIndex) => (
              <CalendarDayTitle
                scope="col"
                key={dayIndex}
                dayIndex={dayIndex}
                state={state}
              >
                <Abbr title={day.title}>{day.abbr}</Abbr>
              </CalendarDayTitle>
            ))}
          </tr>
        </thead>

        <tbody>
          {state?.daysInMonth?.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((date, index) => (
                <CalendarCell state={state} date={date} key={index}>
                  <CalendarCellButton state={state} date={date} />
                </CalendarCell>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarGrid>
    </div>
  )
})

export interface CalendarProps extends ComponentPropsWithoutRef<'div'> {
  state: CalendarStateReturn
}

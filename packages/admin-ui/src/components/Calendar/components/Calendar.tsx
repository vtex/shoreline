import React from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { Role } from 'reakit/Role'

import * as style from './Calendar.style'
import type { CalendarStateReturn } from './CalendarState'
import { CalendarButton } from './CalendarButton'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeaderTitle } from './CalendarHeaderTitle'
import { CalendarDayTitle } from './CalendarDayTitle'
import { IconCaretLeft, IconCaretRight } from '@vtex/phosphor-icons'
import { CalendarHeader } from './CalendarHeader'
import { CalendarCell } from './CalendarCell'
import { CalendarCellButton } from './CalendarCellButton'

import { Abbr } from '../../Abbr'

export interface CalendarOptions {
  state: CalendarStateReturn
}

/**
 * Calendar component
 * @example
 * const state = useCalendarState()
 * <Calendar state={state}>{... composites}</Calendar>
 */
export const Calendar = jsx(Role)(style.calendar, {
  options: ['state'],
  useOptions(options: CalendarOptions, props) {
    const { state } = options

    return {
      ...props,
      role: 'group',
      'aria-labelledby': state.calendarId,
      children: (
        <>
          <CalendarHeader>
            <CalendarButton state={state} goto="previousMonth">
              <IconCaretLeft />
            </CalendarButton>
            <CalendarHeaderTitle state={state} />
            <CalendarButton state={state} goto="nextMonth">
              <IconCaretRight />
            </CalendarButton>
          </CalendarHeader>
          <CalendarGrid state={state} as="table">
            <thead>
              <tr>
                {state?.weekDays?.map((day, dayIndex) => (
                  <CalendarDayTitle
                    as="th"
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
                    <CalendarCell state={state} date={date} as="td" key={index}>
                      <CalendarCellButton state={state} date={date} />
                    </CalendarCell>
                  ))}
                </tr>
              ))}
            </tbody>
          </CalendarGrid>
        </>
      ),
    }
  },
})

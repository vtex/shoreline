import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { IconCaretLeft, IconCaretRight } from '@vtex/phosphor-icons'
import { Role } from 'reakit/Role'

import * as style from './calendar.style'
import type { CalendarStateReturn } from './calendar-state'
import { CalendarHeaderButton } from './calendar-header-button'
import { CalendarGrid } from './calendar-grid'
import { CalendarHeaderTitle } from './calendar-header-title'
import { CalendarDayTitle } from './calendar-day-title'
import { CalendarHeader } from './calendar-header'
import { CalendarCell } from './calendar-cell'
import { CalendarCellButton } from './calendar-cell-button'
import { Abbr } from '../abbr'

export const Calendar = createComponent<typeof Role, CalendarOptions>(
  (props) => {
    const { state, ...htmlProps } = props

    return useElement(Role, {
      baseStyle: style.calendar,
      role: 'group',
      'aria-labelledby': state.calendarId,
      children: (
        <>
          <CalendarHeader>
            <CalendarHeaderButton state={state} handler="previousMonth">
              <IconCaretLeft />
            </CalendarHeaderButton>
            <CalendarHeaderTitle state={state} />
            <CalendarHeaderButton state={state} handler="nextMonth">
              <IconCaretRight />
            </CalendarHeaderButton>
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
      ...htmlProps,
    })
  }
)

export interface CalendarOptions {
  state: CalendarStateReturn
}

import React from 'react'
import { useCalendarGrid } from '@react-aria/calendar'
import { useLocale } from '@vtex/shoreline-components'
import { getWeeksInMonth } from '../utils'

import { CalendarCell } from './calendar-cell'
import './calendar-grid.css'

export function CalendarGrid({ state, ...props }: any) {
  const locale = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)

  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <table data-sl-calendar-grid {...gridProps}>
      <thead data-sl-calendar-grid-header {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date: any, i: number) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td data-sl-calendar-cell key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

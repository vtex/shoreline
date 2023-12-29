import React from 'react'
import type { AriaCalendarGridProps } from '@react-aria/calendar'
import { useCalendarGrid } from '@react-aria/calendar'
import { useLocale } from '@vtex/shoreline-components'

import { getWeeksInMonth } from '../utils'
import { CalendarCell } from './calendar-cell'
import { useCalendarContext } from './calendar-provider'

/**
 * Grid of a calendar
 */
export function CalendarGrid(props: CalendarGridProps) {
  const locale = useLocale()
  const store = useCalendarContext()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    props,
    store.state
  )

  const weeksInMonth = getWeeksInMonth(store.state.visibleRange.start, locale)

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
            {store.state
              .getDatesInWeek(weekIndex)
              .map((date: any, i: number) =>
                date ? (
                  <CalendarCell key={i} date={date} />
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

export type CalendarGridProps = AriaCalendarGridProps

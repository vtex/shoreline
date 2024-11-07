import type { AriaCalendarGridProps } from '@react-aria/calendar'
import { useCalendarGrid } from '@react-aria/calendar'
import { useLocale } from '../locale'

import { getWeeksInMonth } from '../utils'
import { CalendarCell } from './calendar-cell'
import { useCalendarContext } from './calendar-provider'
import { Fragment } from 'react'

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
            <th key={`${day}=${index}`}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {store.state.getDatesInWeek(weekIndex).map((date, index) => (
              <Fragment key={index}>
                {date ? (
                  <CalendarCell date={date} />
                ) : (
                  <td data-sl-calendar-cell />
                )}
              </Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export type CalendarGridOptions = AriaCalendarGridProps
export type CalendarGridProps = CalendarGridOptions

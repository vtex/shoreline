import React, { useRef } from 'react'
import type { AriaCalendarGridProps } from 'react-aria'
import { useCalendarCell, useCalendarGrid, useLocale } from 'react-aria'
import type { CalendarDate } from '@internationalized/date'
import { getWeeksInMonth } from '@internationalized/date'

import { calendarCellTheme } from './calendar.css'

interface CalendarGridProps extends AriaCalendarGridProps {
  state: any
}

export function CalendarGrid({ state, ...props }: CalendarGridProps) {
  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale) as any

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
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
              .map((date: CalendarDate, i: number) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

interface CalendarCellProps {
  state: any
  date: CalendarDate
}

function CalendarCell(props: CalendarCellProps) {
  const { state, date } = props
  const ref = useRef<HTMLButtonElement>(null)
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref)

  return (
    <td className={calendarCellTheme} {...cellProps}>
      <button
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        disabled={isDisabled}
        data-is-unavailable={isUnavailable}
        data-is-selected={isSelected}
      >
        {formattedDate}
      </button>
    </td>
  )
}

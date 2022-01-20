import type { ReactNode } from 'react'
import React from 'react'

import type { CalendarStateReturn } from '../components/CalendarState'

interface RenderParams {
  date: Date
  as: string
  key: number
}

type RenderFunction = (params: RenderParams) => ReactNode

export function renderMonthDays(
  state: CalendarStateReturn,
  render: RenderFunction
) {
  return (
    <tbody>
      {state?.daysInMonth?.map((week, weekIndex) => (
        <tr key={weekIndex}>
          {week.map((date, key) =>
            render({
              date,
              as: 'td',
              key,
            })
          )}
        </tr>
      ))}
    </tbody>
  )
}

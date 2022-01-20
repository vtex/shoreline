import type { ReactNode } from 'react'
import React from 'react'

import type { CalendarStateReturn } from '../components/CalendarState'

interface RenderParams {
  day: { title: string; abbr: string }
  dayIndex: number
  as: string
  scope: string
  key: number
}

type RenderFunction = (params: RenderParams) => ReactNode

export function renderWeekDays(
  state: CalendarStateReturn,
  render: RenderFunction
) {
  return (
    <thead>
      <tr>
        {state?.weekDays?.map((day, dayIndex) =>
          render({ day, dayIndex, as: 'th', scope: 'col', key: dayIndex })
        )}
      </tr>
    </thead>
  )
}

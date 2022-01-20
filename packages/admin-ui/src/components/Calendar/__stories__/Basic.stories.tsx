import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import type { Meta } from '@storybook/react'

import {
  renderMonthDays,
  renderWeekDays,
  Calendar as BaseCalendar,
  CalendarHeaderTitle,
  CalendarButton,
  CalendarGrid,
  CalendarCell,
  CalendarCellButton,
  CalendarDayTitle,
  useCalendarState,
} from '../index'

export default {
  title: 'admin-ui-aria/Calendar',
} as Meta

function Calendar() {
  const state = useCalendarState()

  return (
    <BaseCalendar state={state}>
      <tag.div
        csx={{
          display: 'flex',
        }}
      >
        <CalendarButton
          state={state}
          goto="previousMonth"
        >{`<`}</CalendarButton>
        <CalendarHeaderTitle state={state} />
        <CalendarButton state={state} goto="nextMonth">{`>`}</CalendarButton>
      </tag.div>
      <CalendarGrid state={state} as="table">
        {renderWeekDays(state, (weekProps) => (
          <CalendarDayTitle state={state} {...weekProps}>
            <abbr title={weekProps.day.title}>{weekProps.day.abbr}</abbr>
          </CalendarDayTitle>
        ))}

        {renderMonthDays(state, (monthDayProps) => (
          <CalendarCell state={state} {...monthDayProps}>
            <CalendarCellButton state={state} date={monthDayProps.date} />
          </CalendarCell>
        ))}
      </CalendarGrid>
    </BaseCalendar>
  )
}

export const Basic = () => <Calendar />

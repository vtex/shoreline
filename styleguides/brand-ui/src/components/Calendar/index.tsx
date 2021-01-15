/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Text, Grid, Flex, jsx } from 'theme-ui'
import { Button } from 'reakit'
import { useState, PropsWithChildren, ReactNode } from 'react'
import { DateTime } from 'luxon'

import {
  getFinalCells,
  getInitialCells,
  getMonthCells,
  getWeekDays,
} from './util'

const today = DateTime.local()

const EventTag = ({ event }: EventTagProps) => {
  const defaultColor = 'muted.1'

  let firstColor = defaultColor
  let secondColor = defaultColor

  if (event.colors) {
    firstColor = event.colors[0] ?? defaultColor
    secondColor = event.colors[1] ?? firstColor
  }

  return (
    <Box variant="calendar.eventContainer">
      <Box variant="calendar.event.leftEv" sx={{ bg: firstColor }} />
      <Box sx={{ width: 2 }} />
      <Box variant="calendar.event.rightEv" sx={{ bg: secondColor }} />
    </Box>
  )
}

const Day = ({
  value,
  variant,
  onClick,
  selectedDate,
  events = {},
  ...restProps
}: DayProps) => {
  const dateString = value.toFormat('yyyy-MM-dd')
  const event = events[dateString]
  const RenderComponent = event?.component

  if (RenderComponent) {
    return (
      <RenderComponent
        value={value}
        variant={variant}
        onClick={onClick}
        selectedDate={selectedDate}
        events={events}
        {...restProps}
      >
        <Text>{value.day}</Text>
        <EventTag event={event} />
      </RenderComponent>
    )
  }

  return (
    <Button
      sx={{ variant: `${variant}` }}
      onClick={() => onClick(value)}
      {...restProps}
    >
      <Text>{value.day}</Text>
      {event && <EventTag event={event} />}
    </Button>
  )
}

export const Calendar = ({
  day = today.day,
  month = today.month,
  year = today.year,
  disabled = false,
  onChange,
  events,
  locale = 'pt',
  headerAccessory,
  children,
}: PropsWithChildren<CalendarProps>) => {
  const date = DateTime.local(year, month, day).setLocale(locale)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const handleCellClick = (value: DateTime) => {
    const convertedValue = value.toJSDate()

    setSelectedDate(convertedValue)
    if (onChange) {
      onChange(convertedValue)
    }
  }

  const renderDayCell = ({
    value,
    variant,
  }: {
    value: DateTime
    variant: string
  }) => (
    <Day
      key={`${value.day} - ${value.month}`}
      value={value}
      variant={variant}
      disabled={disabled}
      selectedDate={selectedDate}
      onClick={handleCellClick}
      events={events}
    />
  )

  return (
    <Box variant={`calendar${disabled ? '.disabled' : ''}`}>
      <Flex variant="calendar.header">
        <Text variant={`calendar.title${!headerAccessory ? '.center' : ''}`}>
          {date.toFormat('MMMM yyyy')}
        </Text>
        {headerAccessory}
      </Flex>
      <Grid variant="calendar.grid">
        {getWeekDays(locale).map((weekDay, index) => (
          <Box key={index} variant="calendar.weekdayCell">
            {weekDay}
          </Box>
        ))}
        {getInitialCells(date).map((initialCell) =>
          renderDayCell({ value: initialCell, variant: 'calendar.extraCell' })
        )}
        {getMonthCells(date).map((monthCell) =>
          renderDayCell({ value: monthCell, variant: 'calendar.monthCell' })
        )}
        {getFinalCells(date).map((finalCell) =>
          renderDayCell({ value: finalCell, variant: 'calendar.extraCell' })
        )}
      </Grid>
      {children}
    </Box>
  )
}

interface EventTagProps {
  event: DailyEvents
}

export interface DayProps {
  value: DateTime
  variant: string
  onClick: (date: DateTime) => void
  selectedDate: Date | undefined
  disabled?: boolean
  events?: Events
}

export interface DailyEvents {
  events: Array<{ name: string } & Record<string, number | string>>
  colors?: string[]
  component?: (props: PropsWithChildren<DayProps>) => JSX.Element
}

export type Events = Record<string, DailyEvents>

export interface CalendarProps {
  onChange?: (date: Date) => void
  day?: number
  month?: number
  year?: number
  events?: Events
  locale?: string
  disabled?: boolean
  headerAccessory?: ReactNode
}

/** @jsx jsx */
import { Box, Text, Grid, jsx } from 'theme-ui'
import { useState } from 'react'
import { DateTime, Info } from 'luxon'

const today = DateTime.local()

const Event = ({ event }: EventProps) => {
  const defaultColor = 'muted.2'

  let firstColor = defaultColor
  let secondColor = defaultColor

  if (event.colors) {
    firstColor = event.colors[0] ?? defaultColor
    secondColor = event.colors[1] ?? firstColor
  }

  return (
    <Box variant="calendar.eventContainer">
      <Box variant="calendar.event.leftEv" sx={{ bg: firstColor }} />
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
  let active = false

  if (selectedDate) {
    const selected = DateTime.fromJSDate(selectedDate)

    active = value.ordinal === selected.ordinal
  }

  const dateString = value.toFormat('yyyy-MM-dd')
  const event = events[dateString]

  return (
    <button
      sx={{ variant: `${variant}${active ? '.active' : ''}` }}
      onClick={() => onClick(value)}
      {...restProps}
    >
      {value.day}
      {event && <Event event={event} />}
    </button>
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
}: CalendarProps) => {
  const date = DateTime.local(year, month, day).setLocale(locale)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const handleCellClick = (value: DateTime) => {
    const convertedValue = value.toJSDate()

    setSelectedDate(convertedValue)
    if (onChange) {
      onChange(convertedValue)
    }
  }

  const getFirstDayOfMonth = () => date.startOf('month')
  const getLastDayOfMonth = () => date.endOf('month')

  /**
   * Get all the days in a week. Since luxon weekdays start with Monday and
   * end with Sunday, this method does a workaround for starting with Sunday.
   *
   * @returns array with weekdays initials
   */
  const getWeekDays = (): string[] => {
    const weekdays = Info.weekdays('narrow', { locale })

    const [lastWeekday] = weekdays.slice(-1)
    const restWeekdays = weekdays.slice(0, 6)

    return [lastWeekday, ...restWeekdays]
  }

  const getInitialCells = (): DateTime[] => {
    const initialCells: DateTime[] = []
    const firstDay = getFirstDayOfMonth()
    const firstDayWeekday = firstDay.weekday % 7

    for (let i = 0; i < firstDayWeekday; i++) {
      const cell = firstDay.minus({ days: firstDayWeekday - i })

      initialCells.push(cell)
    }

    return initialCells
  }

  const getMonthCells = (): DateTime[] => {
    const monthCells: DateTime[] = []
    const firstDay = getFirstDayOfMonth()

    for (let i = 0; i < date.daysInMonth; i++) {
      const cell = firstDay.plus({ days: i })

      monthCells.push(cell)
    }

    return monthCells
  }

  const getFinalCells = (): DateTime[] => {
    const finalCells: DateTime[] = []
    const lastDay = getLastDayOfMonth()
    const lastDayWeekday = lastDay.weekday % 7

    for (let i = 6; i > lastDayWeekday; i--) {
      const cell = lastDay.plus({ days: i - lastDayWeekday })

      finalCells.push(cell)
    }

    return finalCells.reverse()
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
      <Text variant="calendar.title">{date.toFormat('MMMM yyyy')}</Text>
      <Grid variant="calendar.grid">
        {getWeekDays().map((weekDay, index) => (
          <Box key={index} variant="calendar.weekdayCell">
            {weekDay}
          </Box>
        ))}
        {getInitialCells().map((initialCell) =>
          renderDayCell({ value: initialCell, variant: 'calendar.extraCell' })
        )}
        {getMonthCells().map((monthCell) =>
          renderDayCell({ value: monthCell, variant: 'calendar.monthCell' })
        )}
        {getFinalCells().map((finalCell) =>
          renderDayCell({ value: finalCell, variant: 'calendar.extraCell' })
        )}
      </Grid>
    </Box>
  )
}

interface EventProps {
  event: Event
}

interface DayProps {
  value: DateTime
  variant: string
  onClick: (date: DateTime) => void
  selectedDate: Date | undefined
  disabled?: boolean
  events?: Events
}

export interface Event {
  name: string
  colors?: string[]
}

export type Events = Record<string, Event>

export interface CalendarProps {
  onChange?: (date: Date) => void
  day?: number
  month?: number
  year?: number
  events?: Events
  locale?: string
  disabled?: boolean
}

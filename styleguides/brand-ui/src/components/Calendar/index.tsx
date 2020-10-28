/** @jsx jsx */
import { Box, Text, Grid, jsx } from 'theme-ui'
import { useState } from 'react'
import { DateTime, Info } from 'luxon'

const today = DateTime.local()

export const Calendar = ({
  day = today.day,
  month = today.month,
  year = today.year,
  disabled = false,
  onChange,
  // events,
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

    const lastWeekday = weekdays.slice(-1)
    const restWeekdays = weekdays.slice(0, 6)

    return [...lastWeekday, ...restWeekdays]
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

  const renderCell = ({
    value,
    variant,
  }: {
    value: DateTime
    variant: string
  }) => {
    let active = false

    if (selectedDate) {
      const selected = DateTime.fromJSDate(selectedDate)

      active = value.ordinal === selected.ordinal
    }

    return (
      <button
        key={`${value.day} - ${value.month}`}
        sx={{ variant: `${variant}${active ? '.active' : ''}` }}
        onClick={() => handleCellClick(value)}
        disabled={disabled}
      >
        {value.day}
      </button>
    )
  }

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
          renderCell({ value: initialCell, variant: 'calendar.extraCell' })
        )}
        {getMonthCells().map((monthCell) =>
          renderCell({ value: monthCell, variant: 'calendar.monthCell' })
        )}
        {getFinalCells().map((finalCell) =>
          renderCell({ value: finalCell, variant: 'calendar.extraCell' })
        )}
      </Grid>
    </Box>
  )
}

type Event = Record<
  string,
  {
    name: string
    colors?: string[]
  }
>

export interface CalendarProps {
  onChange?: (date: Date) => void
  day?: number
  month?: number
  year?: number
  events?: Event[]
  locale?: string
  disabled?: boolean
}

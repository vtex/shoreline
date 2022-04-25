import type { Dispatch, SetStateAction } from 'react'
import { useMemo, useState, useCallback } from 'react'
import { unstable_useId as useId } from 'reakit/Id'
import { useControllableState } from '@vtex/admin-ui-hooks'
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  getDaysInMonth,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns'

import { useWeekStart } from '../i18n'
import type { DateObject } from './utils'
import {
  getDateObject,
  useWeekDays,
  generateDaysInMonthArray,
  createDate,
} from './utils'

import type { InputState } from '../types'

export function useCalendarState(
  props: CalendarInitialState = {}
): CalendarStateReturn {
  const {
    value: initialValue,
    defaultValue = getDateObject(),
    onChange,
    minValue = {
      year: 1,
      month: 0,
      day: 1,
    },
    maxValue = {
      year: 8000,
      month: 11,
      day: 31,
    },
    isDisabled = false,
    isReadOnly = false,
    autoFocus = false,
  } = props

  const [value, setValue] = useControllableState({
    value: initialValue,
    defaultValue,
    onChange,
  })

  const date = useMemo(() => createDate(value), [value])
  const minDate = useMemo(() => createDate(minValue), [minValue])
  const maxDate = useMemo(() => createDate(maxValue), [maxValue])

  const [currentMonth, setCurrentMonth] = useState(date)
  const [focusedDate, setFocusedDate] = useState(date)
  const [isFocused, setFocused] = useState(autoFocus)
  const month = currentMonth.getMonth()
  const year = currentMonth.getFullYear()
  const weekStart = useWeekStart()
  const weekDays = useWeekDays(weekStart)

  // Get 2D Date arrays in 7 days a week format
  const daysInMonth = useMemo(() => {
    let monthStartsAt = (startOfMonth(currentMonth).getDay() - weekStart) % 7

    if (monthStartsAt < 0) {
      monthStartsAt += 7
    }

    const days = getDaysInMonth(currentMonth)
    const weeksInMonth = Math.ceil((monthStartsAt + days) / 7)

    return generateDaysInMonthArray(month, monthStartsAt, weeksInMonth, year)
  }, [month, year, currentMonth, weekStart])

  const isInvalidDateRange = useCallback(
    (value: Date) => {
      return value < minDate || value > maxDate
    },
    [minDate, maxDate]
  )

  const focusCell = useCallback(
    (date: Date) => {
      if (isInvalidDateRange(date)) return

      if (!isSameMonth(date, currentMonth)) {
        setCurrentMonth(startOfMonth(date))
      }

      setFocusedDate(date)
    },
    [isInvalidDateRange, currentMonth]
  )

  const setDate = useCallback(
    (value: Date) => {
      if (!isDisabled && !isReadOnly) {
        setValue(getDateObject(value))
      }
    },
    [isDisabled, isReadOnly, setValue]
  )

  const { id: calendarId } = useId({ id: props.id, baseId: 'calendar' })

  return {
    dateValue: date,
    setDateValue: setDate,
    minDateValue: minDate,
    maxDateValue: maxDate,
    calendarId,
    month,
    year,
    weekStart,
    weekDays,
    daysInMonth,
    isDisabled,
    isFocused,
    isReadOnly,
    setFocused,
    currentMonth,
    setCurrentMonth,
    focusedDate,
    focusCell,
    setFocusedDate,
    focusNextDay() {
      focusCell(addDays(focusedDate, 1))
    },
    focusPreviousDay() {
      focusCell(subDays(focusedDate, 1))
    },
    focusNextWeek() {
      focusCell(addWeeks(focusedDate, 1))
    },
    focusPreviousWeek() {
      focusCell(subWeeks(focusedDate, 1))
    },
    focusNextMonth() {
      focusCell(addMonths(focusedDate, 1))
    },
    focusPreviousMonth() {
      focusCell(subMonths(focusedDate, 1))
    },
    focusStartOfMonth() {
      focusCell(startOfMonth(focusedDate))
    },
    focusEndOfMonth() {
      focusCell(endOfMonth(startOfDay(focusedDate)))
    },
    focusNextYear() {
      focusCell(addYears(focusedDate, 1))
    },
    focusPreviousYear() {
      focusCell(subYears(focusedDate, 1))
    },
    selectFocusedDate() {
      setDate(focusedDate)
    },
    selectDate(date: Date) {
      setDate(date)
    },
    isInvalidDateRange,
  }
}

export interface CalendarState {
  minDateValue: Date
  maxDateValue: Date

  /**
   * Id for the Calendar Header
   */
  calendarId: string | undefined
  /**
   * Selected Date value
   */
  dateValue: Date
  /**
   * Month of the current date value
   */
  month: number
  /**
   * Year of the current date value
   */
  year: number
  /**
   * Start of the week for the current date value
   */
  weekStart: number
  /**
   * Generated week days for CalendarWeekTitle based on weekStart
   */
  weekDays: Array<{
    title: string
    abbr: string
  }>
  /**
   * Generated days in the current month
   */
  daysInMonth: Date[][]
  /**
   * `true` if the calendar is disabled
   */
  isDisabled: boolean
  /**
   * `true` if the calendar is focused
   */
  isFocused: boolean
  /**
   * `true` if the calendar is only readonly
   */
  isReadOnly: boolean
  /**
   * Month of the current Date
   */
  currentMonth: Date
  /**
   * Date value that is currently focused
   */
  focusedDate: Date
  /**
   * Informs if the given date is within the min & max date.
   */
  isInvalidDateRange: (value: Date) => boolean
}

export interface CalendarActions {
  /**
   * Sets `isFocused`
   */
  setFocused: Dispatch<SetStateAction<boolean>>
  /**
   * Sets `currentMonth`
   */
  setCurrentMonth: Dispatch<SetStateAction<Date>>
  /**
   *  Sets `focusedDate`
   */
  setFocusedDate: Dispatch<SetStateAction<Date>>
  /**
   * Sets `dateValue`
   */
  setDateValue: (value: Date) => void
  /**
   * Focus the cell of the specified date
   */
  focusCell: (value: Date) => void
  /**
   * Focus the cell next to the current date
   */
  focusNextDay: () => void
  /**
   * Focus the cell prev to the current date
   */
  focusPreviousDay: () => void
  /**
   * Focus the cell one week next to the current date
   */
  focusNextWeek: () => void
  /**
   * Focus the cell one week prev to the current date
   */
  focusPreviousWeek: () => void
  /**
   * Focus the cell one month next to the current date
   */
  focusNextMonth: () => void
  /**
   * Focus the cell one month prev to the current date
   */
  focusPreviousMonth: () => void
  /**
   * Focus the cell of the first day of the month
   */
  focusStartOfMonth: () => void
  /**
   * Focus the cell of the last day of the month
   */
  focusEndOfMonth: () => void
  /**
   * Focus the cell of the date one year from the current date
   */
  focusNextYear: () => void
  /**
   * Focus the cell of the date one year before the current date
   */
  focusPreviousYear: () => void
  /**
   * Selects the `focusedDate`
   */
  selectFocusedDate: () => void
  /**
   * sets `dateValue`
   */
  selectDate: (value: Date) => void
}

export interface RangeValueMinMax {
  /** The lowest date allowed. */
  minValue?: DateObject
  /** The highest date allowed. */
  maxValue?: DateObject
}

export interface CalendarInitialState extends RangeValueMinMax, InputState {
  /** Id for the calendar grid */
  id?: string
  /** The current date (controlled). */
  value?: DateObject
  /** The default date (uncontrolled). */
  defaultValue?: DateObject
  /** Handler that is called when the date changes. */
  onChange?: (value: DateObject) => void
  /** Whether the element should receive focus on render. */
  autoFocus?: boolean
}

export type CalendarStateReturn = CalendarState & CalendarActions

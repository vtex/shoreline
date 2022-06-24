import {
  getDate,
  getMonth,
  getYear,
  isDate as fnsIsDate,
  isWeekend as fnsIsWeekend,
  isSameDay as fnsIsSameDay,
} from 'date-fns'
import invariant from 'tiny-invariant'

export class AdminUIDate {
  /**
   * We store the date as DateObject because it can be easily converted
   *
   */
  private value: DateObject

  constructor(date?: DateObject | Date) {
    if (isDate(date) || !date) {
      this.value = getDateObject(date)
    } else {
      validateDateObject(date)
      this.value = date
    }
  }

  /**
   * Treat as JS date
   */
  public get asDate(): Date {
    return createDate(this.value)
  }

  /**
   * Treat as DateObject
   */
  public get asDateObject(): DateObject {
    return this.value
  }

  /**
   * Tread as UTC string
   */
  public get asUTCString(): string {
    return this.asDate.toISOString().slice(0, 10)
  }

  /**
   * Set the value
   * @param date : Date | DateObject
   */
  public setValue(date: DateObject | Date) {
    if (isDate(date)) {
      this.value = getDateObject(date)
    } else {
      validateDateObject(date)
      this.value = date
    }
  }

  public get isWeekend(): boolean {
    return fnsIsWeekend(this.asDate)
  }

  public isSameDay(date: Date): boolean {
    return fnsIsSameDay(this.asDate, date)
  }
}

export function createDate(date?: DateObject): Date {
  if (!date) {
    return new Date()
  }

  validateDateObject(date)

  return new Date(date.year, date.month, date.day)
}

function validateDateObject(date: DateObject) {
  const { year, month, day } = date

  invariant(year >= 0, 'The year must be greater then 0')
  invariant(month >= 0 && month <= 11, 'The month must be between 0 and 11')
  invariant(day >= 1 && day <= 31, 'The day must be between 1 and 31')
}

export function generateDaysInMonthArray(
  month: number,
  monthStartsAt: number,
  weeksInMonth: number,
  year: number
) {
  return Array(weeksInMonth)
    .fill(1)
    .reduce((weeks: Date[][], _, weekIndex) => {
      const daysInWeek = [0, 1, 2, 3, 4, 5, 6].reduce(
        (days: Date[], dayIndex) => {
          const day = weekIndex * 7 + dayIndex - monthStartsAt + 2
          const utcDate = toUTCString(new Date(year, month, day))
          const cellDate = new Date(utcDate)

          return [...days, cellDate]
        },
        []
      )

      return [...weeks, daysInWeek]
    }, [])
}

export function toUTCString(date: Date) {
  return date.toISOString().slice(0, 10)
}

export function getDateObject(date?: Date): DateObject {
  const dateToParse = date ?? new Date()

  return {
    year: getYear(dateToParse),
    month: getMonth(dateToParse),
    day: getDate(dateToParse),
  }
}

export function isDate<T extends Date = Date>(maybeDate: any): maybeDate is T {
  return fnsIsDate(maybeDate)
}

export interface DateObject {
  year: number
  month: number
  day: number
}

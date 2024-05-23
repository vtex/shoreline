import { parseDate } from '@internationalized/date'
import { RangeCalendar } from '../index'

export default {
  title: 'date/range-calendar',
}

export function Show() {
  return (
    <RangeCalendar
      value={{
        start: parseDate('2024-07-01'),
        end: parseDate('2024-07-11'),
      }}
    />
  )
}

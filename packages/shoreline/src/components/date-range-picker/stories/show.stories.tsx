import { parseDate } from '../../utils'
import { DateRangePicker } from '../index'

export default {
  title: 'components/date-range-picker',
}

export function Show() {
  return (
    <DateRangePicker
      value={{ start: parseDate('2024-07-01'), end: parseDate('2024-07-11') }}
    />
  )
}

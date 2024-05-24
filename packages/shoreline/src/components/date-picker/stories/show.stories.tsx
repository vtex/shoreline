import { parseDate } from '@internationalized/date'
import { DatePicker } from '../index'

export default {
  title: 'components/date-picker',
}

export function Show() {
  return <DatePicker value={parseDate('2024-07-01')} />
}

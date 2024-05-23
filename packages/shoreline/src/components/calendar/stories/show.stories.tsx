import { Calendar } from '../index'
import { parseDate } from '../../utils'

export default {
  title: 'components/calendar',
}

export function Show() {
  return <Calendar value={parseDate('2024-07-01')} />
}

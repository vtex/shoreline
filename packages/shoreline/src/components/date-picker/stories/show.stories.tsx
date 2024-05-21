import { DatePicker } from '../index'

export default {
  title: 'date/date-picker',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show() {
  return <DatePicker />
}

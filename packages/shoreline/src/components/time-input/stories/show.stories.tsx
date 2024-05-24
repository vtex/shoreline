import { Stack } from '../../stack'
import { parseTime } from '../../utils'
import { TimeInput } from '../index'

export default {
  title: 'components/time-input',
}

export function Show() {
  return (
    <Stack>
      <TimeInput />
      <TimeInput value={parseTime('14:00')} />
      <TimeInput value={parseTime('00:00')} isDisabled />
      <TimeInput value={parseTime('20:00')} isInvalid />
    </Stack>
  )
}

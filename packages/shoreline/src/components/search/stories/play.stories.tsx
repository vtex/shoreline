import { Search } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/search',
  argTypes: {
    value: {
      control: 'text',
    },
    messages: {
      control: 'object',
    },
    disabled: { control: 'boolean', default: false },
    loading: { control: 'boolean', default: false },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    messages: { placeholder: 'Change me' },
  },
}

export function Play(props) {
  return (
    <Stack>
      <Search {...props} />
    </Stack>
  )
}

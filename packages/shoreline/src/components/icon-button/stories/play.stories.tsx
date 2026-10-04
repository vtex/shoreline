import { IconTrash } from '../../../icons'
import { IconButton, type IconButtonProps } from '../index'

export default {
  title: 'components/icon-button',
  argTypes: {
    size: {
      options: ['small', 'normal', 'large'],
      control: { type: 'radio' },
    },
    shape: {
      options: ['default', 'rounded'],
      control: { type: 'radio' },
    },
    variant: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'critical',
        'criticalTertiary',
        'success',
        'outline',
      ],
      control: { type: 'radio' },
    },
    loading: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
  },
  args: {
    size: 'normal',
    shape: 'default',
    variant: 'secondary',
    loading: false,
    disabled: false,
    label: 'Delete',
  },
  parameters: { chromatic: { disableSnapshot: true } },
}

export function Play(args: IconButtonProps) {
  return (
    <IconButton {...args}>
      <IconTrash />
    </IconButton>
  )
}

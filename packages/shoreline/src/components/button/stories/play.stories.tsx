import type { ButtonProps } from '../index'
import { Button } from '../index'
import './style.css'

export default {
  title: 'components/button',
  argTypes: {
    size: {
      options: ['small', 'normal', 'large'],
      control: { type: 'radio' },
      description: 'Increase or decrease padding.',
      defaultValue: 'normal',
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
      description: 'Change between color combinations.',
      defaultValue: 'secondary',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Disable the button and show a spinner.',
    },
    shape: {
      options: ['default', 'rounded'],
      control: { type: 'radio' },
      description: 'Use the theme radius or an explicitly rounded silhouette.',
    },
    children: {
      control: { type: 'text' },
      description: 'Content of the contextual help',
    },
  },
  args: {
    size: 'normal',
    variant: 'secondary',
    shape: 'default',
    loading: false,
    children: 'Shoreline',
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Play(args: ButtonProps) {
  return <Button {...args} />
}

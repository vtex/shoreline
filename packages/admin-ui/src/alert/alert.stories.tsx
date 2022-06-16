import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { AlertProps } from './index'
import { Alert } from './index'
import { Stack } from '../stack'

const dismiss = () => alert('Dismissed')

export default {
  title: 'admin-ui-review/alert',
  component: Alert,
} as Meta

export const Playground: Story<AlertProps> = (args) => {
  return <Alert {...args} />
}

Playground.args = {
  children: 'Order successfully placed',
  csx: {},
  onDismiss: undefined,
  action: { children: 'See order', onClick: () => alert('Order #123') },
}

Playground.argTypes = {
  variant: {
    options: ['info', 'positive', 'warning', 'critical'],
    control: { type: 'radio' },
  },
  onDismiss: {
    options: [dismiss, undefined],
    control: { type: 'radio' },
  },
}

export function Variants() {
  return (
    <Stack fluid>
      <Alert variant="info">Order successfully placed</Alert>
      <Alert variant="positive">Order successfully placed</Alert>
      <Alert variant="warning">
        This account is inactive. Check your billing for more information.
      </Alert>
      <Alert variant="critical">
        Somenthing went wrong. Please, try again.
      </Alert>
    </Stack>
  )
}

export function Actions() {
  return (
    <Stack fluid>
      <Alert
        variant="positive"
        action={{
          children: 'See order',
          onClick: () => alert('Order #123'),
        }}
      >
        Order successfully placed
      </Alert>

      <Alert
        onDismiss={() => {}}
        action={{
          children: 'Back to the old version',
          onClick: () => alert('Old version'),
        }}
      >
        You're beta testing the new Order Details
      </Alert>
    </Stack>
  )
}

import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import type { AlertProps } from './index'
import { Alert } from './index'
import { Box } from '../box'
import { Button } from '../button'
import { Stack } from '../stack'

export default {
  title: 'admin-ui-review/alert',
  component: Alert,
} as Meta

export const Playground: Story<AlertProps> = (args) => {
  return <Alert {...args} />
}

Playground.args = {
  children: 'Order successfully placed',
  visible: true,
  csx: {},
  onDismiss: () => {},
}

export function Tones() {
  return (
    <Stack fluid>
      <Alert tone="info" visible>
        Order successfully placed
      </Alert>
      <Alert tone="positive" visible>
        Order successfully placed
      </Alert>
      <Alert tone="warning" visible>
        This account is inactive. Check your billing for more information.
      </Alert>
      <Alert tone="critical" visible>
        Somenthing went wrong. Please, try again.
      </Alert>
    </Stack>
  )
}

export function Actions() {
  return (
    <Stack fluid>
      <Alert
        tone="positive"
        visible
        action={{
          children: 'See order',
          onClick: () => alert('Order #123'),
        }}
      >
        Order successfully placed
      </Alert>

      <Alert
        visible
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

export function Visible() {
  const [visible, setVisible] = useState(false)

  const handleDismiss = () => setVisible(false)
  const handleToggle = () => setVisible((v) => !v)

  return (
    <Box>
      <Button onClick={handleToggle}>Toggle</Button>
      <Alert visible={visible} onDismiss={handleDismiss}>
        This account is inactive. Check your billing for more information.
      </Alert>
    </Box>
  )
}

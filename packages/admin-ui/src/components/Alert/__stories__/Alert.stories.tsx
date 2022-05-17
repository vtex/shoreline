import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import {
  IconCheckCircle,
  IconWarning,
  IconXOctagon,
  IconQuestion,
  IconWarningCircle,
} from '@vtex/phosphor-icons'

import type { AlertProps } from '../index'
import { Alert } from '../index'
import { Box } from '../../../box'
import { Button } from '../../../button'
import { Anchor } from '../../Anchor'
import { Stack } from '../../../stack'

export default {
  title: 'admin-ui/Alert',
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
      <Alert tone="info" icon={<IconQuestion />} visible>
        Order successfully placed
      </Alert>
      <Alert tone="positive" icon={<IconCheckCircle />} visible>
        Order successfully placed
      </Alert>
      <Alert tone="warning" icon={<IconWarning />} visible>
        This account is inactive. Check your billing for more information.
      </Alert>
      <Alert tone="critical" icon={<IconXOctagon />} visible>
        Somenthing went wrong. Please, try again.
      </Alert>
    </Stack>
  )
}

export function Actions() {
  return (
    <Stack fluid>
      <Alert tone="positive" visible>
        Order successfully placed <Anchor>See order</Anchor>
      </Alert>

      <Alert visible onDismiss={() => {}}>
        You’re beta testing the new Order Details{' '}
        <Anchor>Back to the old version</Anchor>
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

export function Fluid() {
  return (
    <Box csx={{ width: 400 }}>
      <Alert
        icon={<IconWarningCircle />}
        visible
        fluid
        tone="info"
        onDismiss={() => {}}
      >
        This account is inactive. Check your billing for more information.
      </Alert>
    </Box>
  )
}

export function Sticky() {
  return (
    <Alert onDismiss={() => {}} tone="positive" visible sticky>
      Order successfully placed
    </Alert>
  )
}

import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import {
  IconWarningColorful,
  IconSuccessColorful,
  IconErrorColorful,
  IconHelp,
  IconWarningCircle,
} from '@vtex/admin-ui-icons'
import { Box } from '@vtex/admin-primitives'

import type { AlertProps } from './index'
import { Alert } from './index'
import { Set } from '../Set'
import { Button } from '../Button'
import { Anchor } from '../Anchor'

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

export function Types() {
  return (
    <Set orientation="vertical" fluid>
      <Alert type="info" icon={<IconHelp />} visible>
        Order successfully placed
      </Alert>
      <Alert type="success" icon={<IconSuccessColorful />} visible>
        Order successfully placed
      </Alert>
      <Alert type="warning" icon={<IconWarningColorful />} visible>
        This account is inactive. Check your billing for more information.
      </Alert>
      <Alert type="error" icon={<IconErrorColorful />} visible>
        Somenthing went wrong. Please, try again.
      </Alert>
    </Set>
  )
}

export function Actions() {
  return (
    <Set orientation="vertical" fluid>
      <Alert type="success" visible>
        Order successfully placed <Anchor>See order</Anchor>
      </Alert>

      <Alert visible onDismiss={() => {}}>
        You’re beta testing the new Order Details{' '}
        <Anchor>Back to the old version</Anchor>
      </Alert>
    </Set>
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
    <Box csx={{ width: 300 }}>
      <Alert
        icon={<IconWarningCircle />}
        visible
        fluid
        type="info"
        onDismiss={() => {}}
      >
        This account is inactive. Check your billing for more information.
      </Alert>
    </Box>
  )
}

export function Sticky() {
  return (
    <Alert onDismiss={() => {}} type="success" visible sticky>
      Order successfully placed
    </Alert>
  )
}

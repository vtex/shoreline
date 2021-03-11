import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { Alert, AlertProps } from './index'
import { Set } from '../Set'
import { Box } from '@vtex/admin-primitives'
import { Button } from '../Button'
import { IconWarningCircle } from '@vtex/admin-ui-icons'

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
  actions: { primary: { label: 'Print' }, tertiary: { label: 'Cancel' } },
  onDismiss: () => {},
}

export function Types() {
  return (
    <Set orientation="vertical" fluid>
      <Alert type="info" visible>
        Order successfully placed
      </Alert>
      <Alert type="success" visible>
        Order successfully placed
      </Alert>
      <Alert type="warning" visible>
        This account is inactive. Check your billing for more information.
      </Alert>
      <Alert type="error" visible>
        Somenthing went wrong. Please, try again.
      </Alert>
    </Set>
  )
}

export function Actions() {
  return (
    <Set orientation="vertical" fluid>
      <Alert
        type="success"
        actions={{
          primary: {
            label: 'Print',
          },
        }}
        visible
      >
        Order successfully placed
      </Alert>

      <Alert
        type="error"
        actions={{
          primary: {
            label: 'try again',
          },
          tertiary: {
            label: 'cancel',
          },
        }}
        visible
      >
        Order successfully placed
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
      <Alert
        visible={visible}
        onDismiss={handleDismiss}
        actions={{
          primary: {
            label: 'Print',
          },
          tertiary: {
            label: 'Cancel',
            onClick: handleDismiss,
          },
        }}
      >
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
    <Alert
      onDismiss={() => {}}
      type="success"
      actions={{
        primary: {
          label: 'try again',
        },
        tertiary: {
          label: 'cancel',
        },
      }}
      visible
      sticky
    >
      Order successfully placed
    </Alert>
  )
}

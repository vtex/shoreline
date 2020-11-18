import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { Alert, AlertProps } from './index'
import { Set } from '../Set'
import { Box } from '../Box'
import { Button } from '../Button'

export default {
  title: 'beta/alert',
  component: Alert,
} as Meta

export const Basic: Story<AlertProps> = () => {
  return <Alert visible />
}

export const Types: Story<AlertProps> = () => {
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

export const WithActions: Story<AlertProps> = () => {
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

export const ToggleVisibility: Story<AlertProps> = () => {
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

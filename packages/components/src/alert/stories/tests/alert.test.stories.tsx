import React, { useState } from 'react'

import { Alert } from '../../index'
import { Text } from '../../../text'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'components/alert/tests',
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    let alert = canvas.getByRole('alert')
    const dismissButton = within(alert).getByRole('button')

    await expect(alert).toBeVisible()
    await expect(dismissButton).toBeVisible()

    await userEvent.click(dismissButton, {
      delay: 200,
    })

    await expect(alert).not.toBeVisible()

    const button = canvas.getByText('Toggle alert')

    await userEvent.click(button, {
      delay: 200,
    })

    alert = canvas.getByRole('alert')
    await expect(alert).toBeVisible()

    const content = within(alert).getByText('Alert message')

    await expect(content).toBeVisible()
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Dismiss() {
  const [visible, setVisible] = useState(true)

  const toggle = () => setVisible((v) => !v)

  return (
    <div>
      {visible && (
        <Alert variant="success" role="alert" onDismiss={toggle}>
          <Text variant="body">Alert message</Text>
        </Alert>
      )}
      <button onClick={toggle}>Toggle alert</button>
    </div>
  )
}

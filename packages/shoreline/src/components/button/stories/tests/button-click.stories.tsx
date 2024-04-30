import React, { useState } from 'react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Button } from '../../index'

export default {
  title: 'components/button/tests',
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByText('Click me')

    await userEvent.click(button, {
      delay: 250,
    })

    await expect(button).toHaveTextContent('Clicked')
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Click() {
  const [text, setText] = useState('Click me')

  return (
    <Button
      onClick={() => {
        setText('Clicked')
      }}
    >
      {text}
    </Button>
  )
}

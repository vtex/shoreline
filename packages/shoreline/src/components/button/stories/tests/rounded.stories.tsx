import { within, expect } from '@storybook/test'

import { Button } from '../../index'

export default {
  title: 'components/button/tests',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Rounded() {
  return <Button rounded>Rounded Button</Button>
}

Rounded.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole('button')

  await expect(button).toHaveAttribute('data-rounded', 'true')
}

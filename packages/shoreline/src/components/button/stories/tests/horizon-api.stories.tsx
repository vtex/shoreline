import { useState } from 'react'
import { userEvent, within, expect } from '@storybook/test'
import type { StoryContext } from '@storybook/react'
import { Button } from '../../index'

export default {
  title: 'components/button/tests',
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement)
    const compact = canvas.getByRole('button', { name: 'Add item' })
    await userEvent.tab()
    await expect(compact).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')
    await expect(canvas.getByRole('status')).toHaveTextContent('2 actions')
    const send = canvas.getByRole('button', { name: 'Send message' })
    await userEvent.click(send)
    await expect(send).toBeDisabled()
    await expect(send).toHaveAttribute('aria-busy', 'true')
    send.click()
    canvas.getByRole('button', { name: 'Unavailable' }).click()
    await expect(canvas.getByRole('status')).toHaveTextContent('3 actions')
  },
}

export function HorizonApi() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const increment = () => setCount((previous) => previous + 1)

  return (
    <div>
      <Button
        size="small"
        shape="rounded"
        variant="outline"
        onClick={increment}
      >
        Add item
      </Button>
      <Button
        variant="success"
        shape="rounded"
        loading={loading}
        onClick={() => {
          increment()
          setLoading(true)
        }}
      >
        Send message
      </Button>
      <Button variant="outline" disabled onClick={increment}>
        Unavailable
      </Button>
      <output aria-live="polite">{count} actions</output>
    </div>
  )
}

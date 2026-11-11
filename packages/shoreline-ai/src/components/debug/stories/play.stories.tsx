import { expect, userEvent, waitFor, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@vtex/shoreline'

import '@vtex/shoreline-ai/css'

import { AIMessages } from '../../messages'
import { AIStreamDebugPanel } from '../ai-stream-debug-panel'
import {
  DebugDrawer,
  DebugStoryDecorator,
  SendSampleMessage,
} from './decorators'

const meta: Meta<typeof AIStreamDebugPanel> = {
  title: 'shoreline-ai/stream-debug',
  component: AIStreamDebugPanel,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <DebugStoryDecorator fast>
        <Story />
      </DebugStoryDecorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AIStreamDebugPanel>

export const OpenExpandAndSwitchRuns: Story = {
  render: () => (
    <Flex direction="column" gap="$space-4" align="start">
      <Flex gap="$space-2">
        <SendSampleMessage text="First" />
        <SendSampleMessage text="Second" />
        <DebugDrawer />
      </Flex>
      <AIMessages />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Send First' }))
    await canvas.findByText(/mock transport\.$/)
    await userEvent.click(canvas.getByRole('button', { name: 'Send Second' }))

    await userEvent.click(
      canvas.getByRole('button', { name: 'Open stream debug' })
    )

    const panel = await page.findByRole('region', { name: 'Recorded runs' })
    const inPanel = within(panel)

    await waitFor(() =>
      expect(inPanel.getByText(/^Status:/)).toHaveTextContent('ready')
    )

    const row = inPanel.getByRole('button', { name: /^Step 1\b/ })

    await userEvent.click(row)
    await expect(row).toHaveAttribute('aria-expanded', 'true')
    await expect(
      inPanel.getByRole('button', { name: 'Copy JSON' })
    ).toBeVisible()
    await expect(
      panel.querySelector('[data-sl-ai-stream-debug-json]')?.textContent
    ).toContain('\n  "parts": [')

    const newestRunId = inPanel.getByText(/^Run id:/).textContent

    await userEvent.click(inPanel.getByRole('combobox'))

    const options = await page.findAllByRole('option')

    await expect(options).toHaveLength(2)
    await userEvent.click(options[1])

    await waitFor(() =>
      expect(inPanel.getByText(/^Run id:/).textContent).not.toBe(newestRunId)
    )
  },
}

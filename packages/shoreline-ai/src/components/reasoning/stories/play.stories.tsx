import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'

import '@vtex/shoreline-ai/css'

import { AIMessages } from '../../messages'
import { MessagesStoryDecorator } from '../../messages/stories/decorators'
import {
  reasoningToolText,
  twoReasoningGroups,
} from '../../messages/stories/messages-story-shared'
import { AIThread, AIThreadViewport } from '../../thread'
import {
  ThreadHistorySeed,
  threadStoryShellStyle,
} from '../../thread/stories/thread-story-shared'
import { AIReasoning } from '../index'

const meta: Meta<typeof AIReasoning> = {
  title: 'shoreline-ai/reasoning',
  component: AIReasoning,
  decorators: [
    (Story) => (
      <MessagesStoryDecorator>
        <div style={threadStoryShellStyle}>
          <AIThread>
            <AIThreadViewport autoScroll>
              <Story />
            </AIThreadViewport>
          </AIThread>
        </div>
      </MessagesStoryDecorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AIReasoning>

export const ExpandsAndCollapsesReasoning: Story = {
  render: () => (
    <ThreadHistorySeed messages={reasoningToolText}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    const trigger = await within(canvasElement).findByRole('button', {
      name: /^Reasoning complete/,
    })

    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  },
}

export const TwoGroupsKeepIndependentState: Story = {
  render: () => (
    <ThreadHistorySeed messages={twoReasoningGroups}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    const triggers = await waitFor(() => {
      const found = within(canvasElement).getAllByRole('button', {
        name: /^Reasoning complete/,
      })

      expect(found).toHaveLength(2)

      return found
    })
    const [first, second] = triggers

    await userEvent.click(first)
    await expect(first).toHaveAttribute('aria-expanded', 'true')
    await expect(second).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(second)
    await userEvent.click(first)
    await expect(first).toHaveAttribute('aria-expanded', 'false')
    await expect(second).toHaveAttribute('aria-expanded', 'true')
  },
}

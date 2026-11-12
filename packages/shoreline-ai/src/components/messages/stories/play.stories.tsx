import { expect, userEvent, waitFor, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline-ai/css'

import { AIThread, AIThreadViewport } from '../../thread'
import {
  ThreadHistorySeed,
  createMockThreadMessages,
  threadStoryShellStyle,
} from '../../thread/stories/thread-story-shared'
import { AIMessages } from '../index'
import { MessagesStoryDecorator } from './decorators'
import {
  plainAnswer,
  reasoningToolText,
  twoReasoningGroups,
} from './messages-story-shared'

const meta: Meta<typeof AIMessages> = {
  title: 'shoreline-ai/messages',
  component: AIMessages,
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

type Story = StoryObj<typeof AIMessages>

export const RendersHistory: Story = {
  // Deferred to the component review (see shoreline-ai-ci-readiness spec)
  tags: ['skip-test'],
  render: () => (
    <ThreadHistorySeed messages={createMockThreadMessages(2)}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
  play: async () => {
    await expect(document.querySelector('[data-sl-ai-messages]')).toBeTruthy()
    await expect(
      document.querySelector('[data-sl-ai-message-role="user"]')
    ).toBeTruthy()
  },
}

export const ExpandsAndCollapsesReasoning: Story = {
  render: () => (
    <ThreadHistorySeed messages={reasoningToolText}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    const trigger = await within(canvasElement).findByRole('button', {
      name: /^Reasoned/,
    })

    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  },
}

export const CopyShowsCheckThenResets: Story = {
  render: () => (
    <ThreadHistorySeed messages={plainAnswer}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    const writeText = async (_text: string) => {}
    const calls: string[] = []

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          calls.push(text)
          await writeText(text)
        },
      },
    })

    const button = await within(canvasElement).findByRole('button', {
      name: 'Copy message',
    })

    await userEvent.click(button)
    await waitFor(() => expect(button).toHaveAttribute('data-copied'))
    await expect(calls).toEqual(['Three orders are late this week.'])
    await waitFor(() => expect(button).not.toHaveAttribute('data-copied'), {
      timeout: 4000,
    })
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
        name: /^Reasoned/,
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

export const ActionsReachableByKeyboard: Story = {
  render: () => (
    <ThreadHistorySeed messages={reasoningToolText}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = await canvas.findByRole('button', { name: /^Reasoned/ })
    const copy = await canvas.findByRole('button', { name: 'Copy message' })
    const actions = canvasElement.querySelector(
      '[data-sl-ai-message-actions]'
    ) as HTMLElement

    trigger.focus()
    await userEvent.tab()
    await expect(copy).toHaveFocus()
    await waitFor(() => expect(getComputedStyle(actions).opacity).toBe('1'))
  },
}

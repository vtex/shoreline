import { expect, userEvent, waitFor, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline-ai/css'

import { AIThread, AIThreadViewport } from '../../thread'
import {
  ThreadHistorySeed,
  createMockThreadMessages,
  threadStoryShellStyle,
} from '../../thread/stories/thread-story-shared'
import {
  AIMessageAction,
  AIMessageActions,
  AIMessageAssistant,
  AIMessageCopy,
  AIMessageDate,
  AIMessageParts,
  AIMessageUser,
  AIMessages,
} from '../index'
import { MessagesStoryDecorator } from './decorators'
import {
  plainAnswer,
  reasoningToolText,
  twoReasoningGroups,
} from './messages-story-shared'
import { ThumbIcon } from './story-icons'

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
      name: /^Reasoning complete/,
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
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
    const calls: string[] = []

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          calls.push(text)
        },
      },
    })

    try {
      const button = await within(canvasElement).findByRole('button', {
        name: 'Copy message',
      })

      await userEvent.click(button)
      await waitFor(() => expect(button).toHaveAttribute('data-copied'))
      await expect(button).toHaveAccessibleName('Copied!')
      await expect(calls).toEqual(['Three orders are late this week.'])
      await waitFor(() => expect(button).not.toHaveAttribute('data-copied'), {
        timeout: 4000,
      })
      await expect(button).toHaveAccessibleName('Copy message')
    } finally {
      // Do not leak the fake clipboard into later stories.
      if (original) {
        Object.defineProperty(navigator, 'clipboard', original)
      } else {
        Reflect.deleteProperty(navigator, 'clipboard')
      }
    }
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

export const ActionsReachableByKeyboard: Story = {
  render: () => (
    <ThreadHistorySeed messages={reasoningToolText}>
      <AIMessages>
        <AIMessageUser />
        <AIMessageAssistant>
          <AIMessageParts />
          <AIMessageActions>
            <AIMessageAction label="Good response">
              <ThumbIcon direction="up" />
            </AIMessageAction>
            <AIMessageAction label="Bad response">
              <ThumbIcon direction="down" />
            </AIMessageAction>
            <AIMessageCopy />
            <AIMessageDate />
          </AIMessageActions>
        </AIMessageAssistant>
      </AIMessages>
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = await canvas.findByRole('button', {
      name: /^Reasoning complete/,
    })
    const up = await canvas.findByRole('button', { name: 'Good response' })
    const down = canvas.getByRole('button', { name: 'Bad response' })
    const copy = canvas.getByRole('button', { name: 'Copy message' })
    const date = canvasElement.querySelector(
      '[data-sl-ai-message-date]'
    ) as HTMLElement

    // The bar is always visible; the date (created long ago) is not, until
    // the focus is inside the message.
    await expect(up).toBeVisible()
    await expect(getComputedStyle(date).opacity).toBe('0')

    trigger.focus()
    await userEvent.tab()
    await expect(up).toHaveFocus()
    await userEvent.tab()
    await expect(down).toHaveFocus()
    await userEvent.tab()
    await expect(copy).toHaveFocus()
    await waitFor(() => expect(getComputedStyle(date).opacity).toBe('1'))
  },
}

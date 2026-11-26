import { expect, userEvent, waitFor, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

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
import { plainAnswer, reasoningToolText } from './messages-story-shared'
import { AppThumbs, ThumbIcon, type ThumbVote } from './story-icons'

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

/**
 * The app's thumbs are a toggle pair per answer: pressing one presses it and
 * shows the filled glyph, pressing the other moves the selection, and pressing
 * the pressed one again clears it.
 */
function VotingThumbs() {
  const [votes, setVotes] = useState<Record<string, ThumbVote>>({})

  function handleVote(messageId: string, vote: ThumbVote | null) {
    setVotes((current) => {
      const next = { ...current }

      if (vote) next[messageId] = vote
      else delete next[messageId]

      return next
    })
  }

  return (
    <ThreadHistorySeed messages={plainAnswer}>
      <AIMessages>
        <AIMessageUser />
        <AIMessageAssistant>
          <AIMessageParts />
          <AIMessageActions>
            <AppThumbs votes={votes} onVote={handleVote} />
            <AIMessageCopy />
            <AIMessageDate />
          </AIMessageActions>
        </AIMessageAssistant>
      </AIMessages>
    </ThreadHistorySeed>
  )
}

/** The filled glyph of a pressed thumb is drawn on a 16px grid. */
function isFilled(button: HTMLElement) {
  return button.querySelector('svg')?.getAttribute('viewBox') === '0 0 16 16'
}

export const AppThumbsToggle: Story = {
  render: () => <VotingThumbs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const up = await canvas.findByRole('button', { name: 'Good response' })
    const down = canvas.getByRole('button', { name: 'Bad response' })

    await expect(up).toHaveAttribute('aria-pressed', 'false')
    await expect(down).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(down)
    await expect(down).toHaveAttribute('aria-pressed', 'true')
    await expect(up).toHaveAttribute('aria-pressed', 'false')
    await expect(isFilled(down)).toBe(true)
    await expect(isFilled(up)).toBe(false)

    await userEvent.click(up)
    await expect(up).toHaveAttribute('aria-pressed', 'true')
    await expect(down).toHaveAttribute('aria-pressed', 'false')
    await expect(isFilled(up)).toBe(true)
    await expect(isFilled(down)).toBe(false)

    await userEvent.click(up)
    await expect(up).toHaveAttribute('aria-pressed', 'false')
    await expect(down).toHaveAttribute('aria-pressed', 'false')
    await expect(isFilled(up)).toBe(false)
  },
}

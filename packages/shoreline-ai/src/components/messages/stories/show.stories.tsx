import type { Meta, StoryObj } from '@storybook/react'
import { ThreadPrimitive } from '@assistant-ui/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'
import type { CSSProperties } from 'react'
import { IconButton, IconHeart } from '@vtex/shoreline'

import '@vtex/shoreline-ai/css'

import { AIThread, AIThreadViewport } from '../../thread'
import {
  ThreadHistorySeed,
  createMockThreadMessages,
  threadStoryShellStyle,
} from '../../thread/stories/thread-story-shared'
import {
  AIMessageActions,
  AIMessageAssistant,
  AIMessageParts,
  AIMessageRoot,
  AIMessageUser,
  AIMessages,
} from '../index'
import { AIThinkingIndicator } from '../ai-thinking-indicator'
// Internal building blocks: the runtime does not supply a reasoning duration yet,
// so these stories preview the "Worked for" state it will provide later.
import { AIMessageReasoningGroup } from '../ai-message-reasoning-group'
import { MessageMessagesProvider } from '../message-messages-context'
import { MessagesStoryDecorator } from './decorators'
import {
  SendOnMount,
  holdingNoParts,
  holdingReasoning,
  plainAnswer,
  reasoningToolText,
  simpleReasoning,
  twoReasoningGroups,
} from './messages-story-shared'

const meta: Meta<typeof AIMessages> = {
  title: 'shoreline-ai/messages',
  component: AIMessages,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    (Story, context) => (
      <MessagesStoryDecorator transport={context.parameters.messagesTransport}>
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

export const UserBubbleAndAssistant: Story = {
  render: () => (
    <ThreadHistorySeed messages={createMockThreadMessages(4)}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
}

export const ExplicitComposition: Story = {
  render: () => (
    <ThreadHistorySeed messages={createMockThreadMessages(2)}>
      <AIMessages showReasoningTools={false}>
        <AIMessageUser />
        <AIMessageAssistant showReasoningTools={false} />
      </AIMessages>
    </ThreadHistorySeed>
  ),
}

export const CustomTextPart: Story = {
  render: () => (
    <ThreadHistorySeed messages={createMockThreadMessages(2)}>
      <AIMessages>
        <AIMessageAssistant>
          <AIMessageParts>
            {(part) =>
              part.type === 'text' ? (
                <p data-story-custom-text>{part.text}</p>
              ) : null
            }
          </AIMessageParts>
        </AIMessageAssistant>
      </AIMessages>
    </ThreadHistorySeed>
  ),
}

const shortUserMessage = [
  {
    id: 'user-short',
    role: 'user' as const,
    createdAt: '2026-05-20T12:00:00.000Z',
    parts: [{ type: 'text' as const, text: 'Show me last week orders.' }],
  },
]

const longUserMessage = [
  {
    id: 'user-long',
    role: 'user' as const,
    createdAt: '2026-05-20T12:00:00.000Z',
    parts: [
      {
        type: 'text' as const,
        text: 'I need a summary of every order placed during the last quarter, grouped by sales channel and payment method. Please highlight the channels whose revenue dropped compared with the previous quarter, and list the ten products that contributed the most to that drop. If possible, also suggest a few actions the merchandising team could take to recover the lost revenue before the end of the month.',
      },
    ],
  },
]

export const UserBubbleShort: Story = {
  render: () => (
    <ThreadHistorySeed messages={shortUserMessage}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
}

export const UserBubbleLong: Story = {
  render: () => (
    <ThreadHistorySeed messages={longUserMessage}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
}

export const UserBubbleCustomMaxWidth: Story = {
  render: () => (
    <div style={{ '--sl-ai-message-user-max-width': '20rem' } as CSSProperties}>
      <ThreadHistorySeed messages={longUserMessage}>
        <AIMessages />
      </ThreadHistorySeed>
    </div>
  ),
}

const reasoningBody = (
  <p style={{ margin: 0 }}>
    Comparing each order with its promised delivery date.
  </p>
)

/** Running: label "Reasoning" with the dots beside it, from a real (held) run. */
export const ReasoningRunning: Story = {
  parameters: { messagesTransport: holdingReasoning },
  render: () => (
    <SendOnMount>
      <AIMessages />
    </SendOnMount>
  ),
  play: async ({ canvasElement }) => {
    await within(canvasElement).findByRole('button', { name: /^Reasoning/ })
  },
}

/** Complete with a duration: "Reasoned" plus "Worked for 3 min". */
export const ReasoningCompleteWithDuration: Story = {
  render: () => (
    <MessageMessagesProvider>
      <AIMessageReasoningGroup status="complete" duration={180_000}>
        {reasoningBody}
      </AIMessageReasoningGroup>
    </MessageMessagesProvider>
  ),
}

/** Complete without a duration: "Reasoned" only, no "Worked for". */
export const ReasoningCompleteWithoutDuration: Story = {
  render: () => (
    <ThreadHistorySeed messages={simpleReasoning}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
}

/** Expanded panel with reasoning text, a tool step and the final answer. */
export const ReasoningExpanded: Story = {
  render: () => (
    <ThreadHistorySeed messages={reasoningToolText}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    const trigger = await within(canvasElement).findByRole('button', {
      name: /^Reasoned/,
    })

    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  },
}

/** Reasoning, text, reasoning: two independent panels in one message. */
export const TwoReasoningGroups: Story = {
  render: () => (
    <ThreadHistorySeed messages={twoReasoningGroups}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(
        within(canvasElement).getAllByRole('button', { name: /^Reasoned/ })
      ).toHaveLength(2)
    )
  },
}

/** The indicator on its own. */
export const ThinkingIndicator: Story = {
  render: () => (
    <MessageMessagesProvider>
      <AIThinkingIndicator />
    </MessageMessagesProvider>
  ),
}

/** Inside an assistant message that is running and has no parts yet. */
export const ThinkingIndicatorInMessage: Story = {
  parameters: { messagesTransport: holdingNoParts },
  render: () => (
    <SendOnMount>
      <AIMessages />
    </SendOnMount>
  ),
  play: async ({ canvasElement }) => {
    await within(canvasElement).findByRole('status')
  },
}

/**
 * Actions row in its visible state. The row is hidden until the message is
 * hovered or focused. Synthetic hover events do not trigger the CSS `:hover`
 * state, so the play function moves real focus into the row (`:focus-within`
 * reveals it) and the Chromatic delay covers the opacity transition. The
 * snapshot therefore also shows the focus ring. The feedback slot is a plain
 * IconButton passed as children.
 */
export const ActionsVisible: Story = {
  parameters: { chromatic: { disableSnapshot: false, delay: 400 } },
  render: () => (
    <ThreadHistorySeed messages={plainAnswer}>
      <MessageMessagesProvider>
        {/* AIMessageAssistant already renders its own actions row, so the
            feedback slot is composed here from AIMessageRoot instead. */}
        <ThreadPrimitive.Messages>
          {({ message }) =>
            message.role === 'assistant' ? (
              <AIMessageRoot messageRole="assistant">
                <AIMessageParts />
                <AIMessageActions>
                  <IconButton variant="tertiary" label="Good response">
                    <IconHeart />
                  </IconButton>
                </AIMessageActions>
              </AIMessageRoot>
            ) : (
              <AIMessageUser />
            )
          }
        </ThreadPrimitive.Messages>
      </MessageMessagesProvider>
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const copy = await canvas.findByRole('button', { name: 'Copy message' })

    copy.focus()
    await waitFor(() =>
      expect(
        getComputedStyle(
          canvasElement.querySelector(
            '[data-sl-ai-message-actions]'
          ) as HTMLElement
        ).opacity
      ).toBe('1')
    )
    await expect(
      canvas.getByRole('button', { name: 'Good response' })
    ).toBeVisible()
  },
}

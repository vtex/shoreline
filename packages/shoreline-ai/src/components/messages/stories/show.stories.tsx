import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'
import type { CSSProperties } from 'react'
import { IconSparkle } from '@vtex/shoreline'

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
  AIMessageCopy,
  AIMessageDate,
  AIMessageParts,
  AIMessageUser,
  AIMessages,
  AIThinkingIndicator,
  AIWorkingMark,
} from '../index'
import {
  CopiedEnvironment,
  FrozenClock,
  MessagesStoryDecorator,
} from './decorators'
import { earlierAnswer, plainAnswer } from './messages-story-shared'
import { AppThumbs } from './story-icons'

const meta: Meta<typeof AIMessages> = {
  title: 'shoreline-ai/messages',
  component: AIMessages,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    (Story, context) => (
      // The clock is frozen so dates and elapsed times are the same on every
      // Chromatic run.
      <FrozenClock>
        <MessagesStoryDecorator
          transport={context.parameters.messagesTransport}
        >
          <div style={threadStoryShellStyle}>
            <AIThread>
              <AIThreadViewport autoScroll>
                <Story />
              </AIThreadViewport>
            </AIThread>
          </div>
        </MessagesStoryDecorator>
      </FrozenClock>
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

/** The last answer: copy and the date ("now" under a minute) under the text. */
export const ActionsLastAnswer: Story = {
  render: () => (
    <ThreadHistorySeed messages={plainAnswer}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
}

/** An earlier answer keeps its bar, floating above the next question. */
export const ActionsEarlierAnswer: Story = {
  render: () => (
    <ThreadHistorySeed messages={earlierAnswer}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
}

/**
 * The app's own thumbs in the bar, in front of copy and date, on two answers:
 * the first answer is liked and the second disliked. A pressed thumb shows the
 * filled glyph in the same color; the dislike glyph is the like glyph
 * mirrored. Thumb icons belong to the app (these are the proposal's): the
 * package ships none.
 */
export const ActionsWithAppThumbs: Story = {
  render: () => (
    <ThreadHistorySeed messages={earlierAnswer}>
      <AIMessages>
        <AIMessageUser />
        <AIMessageAssistant>
          <AIMessageParts />
          <AIMessageActions>
            <AppThumbs votes={{ 'assistant-5': 'up', 'assistant-6': 'down' }} />
            <AIMessageCopy />
            <AIMessageDate />
          </AIMessageActions>
        </AIMessageAssistant>
      </AIMessages>
    </ThreadHistorySeed>
  ),
}

/**
 * Right after a copy: the check icon replaces the copy icon. The decorator
 * fakes the clipboard and swallows the 2 second reset timer while the story
 * is mounted, so the check stays on screen for the snapshot. Both are
 * restored on unmount.
 */
export const ActionsCopied: Story = {
  decorators: [
    (Story) => (
      <CopiedEnvironment>
        <Story />
      </CopiedEnvironment>
    ),
  ],
  render: () => (
    <ThreadHistorySeed messages={plainAnswer}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
  play: async ({ canvasElement }) => {
    const button = await within(canvasElement).findByRole('button', {
      name: 'Copy message',
    })

    await userEvent.click(button)
    await waitFor(() => expect(button).toHaveAttribute('data-copied'))
    await expect(button).toHaveAccessibleName('Copied!')
  },
}

/** The text loading effect on its own. */
export const ThinkingIndicatorStandalone: Story = {
  render: () => <AIThinkingIndicator>Searching orders…</AIThinkingIndicator>,
}

/** The working mark on its own, with the default My Assistant glyph. */
export const WorkingMarkStandalone: Story = {
  render: () => <AIWorkingMark />,
}

/** The working mark with the app's own glyph, overriding the default. */
export const WorkingMarkCustomGlyph: Story = {
  render: () => (
    <AIWorkingMark>
      <IconSparkle />
    </AIWorkingMark>
  ),
}

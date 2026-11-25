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
  AIMessageAction,
  AIMessageActions,
  AIMessageAssistant,
  AIMessageCopy,
  AIMessageDate,
  AIMessageParts,
  AIMessageReasoning,
  AIMessageReasoningContent,
  AIMessageReasoningElapsed,
  AIMessageReasoningHeader,
  AIMessageReasoningLabel,
  AIMessageReasoningMark,
  AIMessageReasoningRoot,
  AIMessageReasoningTrigger,
  AIMessageUser,
  AIMessages,
  AIThinkingIndicator,
  AIWorkingMark,
  AIMessagesI18nProvider,
} from '../index'
import {
  CopiedEnvironment,
  FROZEN_NOW,
  FrozenClock,
  MessagesStoryDecorator,
} from './decorators'
import {
  SendOnMount,
  earlierAnswer,
  holdingNoParts,
  plainAnswer,
  reasoningToolText,
  twoReasoningGroups,
} from './messages-story-shared'
import { ThumbIcon } from './story-icons'

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

const reasoningBody = (
  <p style={{ margin: 0 }}>
    Comparing each order with its promised delivery date.
  </p>
)

/** Running for 42 seconds: mark, shimmering label, elapsed time and chevron. */
export const ReasoningRunning: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIMessageReasoningRoot status="running" startedAt={FROZEN_NOW - 42_000}>
        <AIMessageReasoningHeader />
        <AIMessageReasoningContent>{reasoningBody}</AIMessageReasoningContent>
      </AIMessageReasoningRoot>
    </AIMessagesI18nProvider>
  ),
}

/** Running and open: the body shows under the header. */
export const ReasoningRunningExpanded: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIMessageReasoningRoot
        status="running"
        startedAt={FROZEN_NOW - 65_000}
        defaultExpanded
      >
        <AIMessageReasoningHeader />
        <AIMessageReasoningContent>{reasoningBody}</AIMessageReasoningContent>
      </AIMessageReasoningRoot>
    </AIMessagesI18nProvider>
  ),
}

/** Complete with a duration: "Reasoning completed in 2m", no mark. */
export const ReasoningCompleteWithDuration: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIMessageReasoningRoot status="complete" duration={120_000}>
        <AIMessageReasoningHeader />
        <AIMessageReasoningContent>{reasoningBody}</AIMessageReasoningContent>
      </AIMessageReasoningRoot>
    </AIMessagesI18nProvider>
  ),
}

/** Complete without a duration (for example loaded from history). */
export const ReasoningCompleteWithoutDuration: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIMessageReasoningRoot status="complete">
        <AIMessageReasoningHeader />
        <AIMessageReasoningContent>{reasoningBody}</AIMessageReasoningContent>
      </AIMessageReasoningRoot>
    </AIMessagesI18nProvider>
  ),
}

/** Complete and open: 3px bar, 16px padding and the reasoning text. */
export const ReasoningCompleteExpanded: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIMessageReasoningRoot
        status="complete"
        duration={42_000}
        defaultExpanded
      >
        <AIMessageReasoningHeader />
        <AIMessageReasoningContent>
          {reasoningBody}
          <p style={{ margin: 0 }}>
            Three orders are past their promised date.
          </p>
        </AIMessageReasoningContent>
      </AIMessageReasoningRoot>
    </AIMessagesI18nProvider>
  ),
}

/**
 * Before the first part arrives: the running header with no chevron, from a
 * real (held) run. The clock is frozen, so the elapsed time reads "1s".
 */
export const ReasoningPending: Story = {
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

/** A reasoning template with its own label, open from the start. */
export const ReasoningCustomTemplate: Story = {
  render: () => (
    <ThreadHistorySeed messages={reasoningToolText}>
      <AIMessages>
        <AIMessageUser />
        <AIMessageAssistant>
          <AIMessageParts
            reasoning={
              <AIMessageReasoning defaultExpanded>
                <AIMessageReasoningHeader>
                  {/* Overrides the default My Assistant mark. */}
                  <AIMessageReasoningMark>
                    <IconSparkle />
                  </AIMessageReasoningMark>
                  <AIMessageReasoningLabel>
                    Analyzing orders
                  </AIMessageReasoningLabel>
                  <AIMessageReasoningElapsed />
                  <AIMessageReasoningTrigger />
                </AIMessageReasoningHeader>
                <AIMessageReasoningContent />
              </AIMessageReasoning>
            }
          />
          <AIMessageActions />
        </AIMessageAssistant>
      </AIMessages>
    </ThreadHistorySeed>
  ),
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
        within(canvasElement).getAllByRole('button', {
          name: /^Reasoning complete/,
        })
      ).toHaveLength(2)
    )
  },
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
 * The app's own thumbs in the bar, in front of copy and date. The first is
 * pressed, so it shows the filled glyph in the same color. Thumb icons belong
 * to the app (these are the proposal's): the package ships none.
 */
export const ActionsWithAppThumbs: Story = {
  render: () => (
    <ThreadHistorySeed messages={plainAnswer}>
      <AIMessages>
        <AIMessageUser />
        <AIMessageAssistant>
          <AIMessageParts />
          <AIMessageActions>
            <AIMessageAction label="Good response" aria-pressed>
              <ThumbIcon direction="up" selected />
            </AIMessageAction>
            <AIMessageAction label="Bad response" aria-pressed={false}>
              <ThumbIcon direction="down" />
            </AIMessageAction>
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

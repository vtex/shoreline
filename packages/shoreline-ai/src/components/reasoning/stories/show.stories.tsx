import type { Meta, StoryObj } from '@storybook/react'
import { expect, waitFor, within } from '@storybook/test'
import { IconSparkle } from '@vtex/shoreline'

import '@vtex/shoreline-ai/css'

import {
  AIMessageActions,
  AIMessageAssistant,
  AIMessageParts,
  AIMessageUser,
  AIMessages,
  AIMessagesI18nProvider,
} from '../../messages'
import {
  FROZEN_NOW,
  FrozenClock,
  MessagesStoryDecorator,
} from '../../messages/stories/decorators'
import {
  SendOnMount,
  holdingNoParts,
  reasoningToolText,
  twoReasoningGroups,
} from '../../messages/stories/messages-story-shared'
import { AIThread, AIThreadViewport } from '../../thread'
import {
  ThreadHistorySeed,
  threadStoryShellStyle,
} from '../../thread/stories/thread-story-shared'
import {
  AIReasoning,
  AIReasoningContent,
  AIReasoningElapsed,
  AIReasoningHeader,
  AIReasoningLabel,
  AIReasoningMark,
  AIReasoningRoot,
  AIReasoningTrigger,
} from '../index'

const meta: Meta<typeof AIReasoning> = {
  title: 'shoreline-ai/reasoning',
  component: AIReasoning,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    (Story, context) => (
      // The clock is frozen so the elapsed times are the same on every run.
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

type Story = StoryObj<typeof AIReasoning>

const reasoningBody = (
  <p style={{ margin: 0 }}>
    Comparing each order with its promised delivery date.
  </p>
)

/** Running for 42 seconds: mark, shimmering label, elapsed time and chevron. */
export const ReasoningRunning: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIReasoningRoot status="running" startedAt={FROZEN_NOW - 42_000}>
        <AIReasoningHeader />
        <AIReasoningContent>{reasoningBody}</AIReasoningContent>
      </AIReasoningRoot>
    </AIMessagesI18nProvider>
  ),
}

/** Running and open: the body shows under the header. */
export const ReasoningRunningExpanded: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIReasoningRoot
        status="running"
        startedAt={FROZEN_NOW - 65_000}
        defaultExpanded
      >
        <AIReasoningHeader />
        <AIReasoningContent>{reasoningBody}</AIReasoningContent>
      </AIReasoningRoot>
    </AIMessagesI18nProvider>
  ),
}

/** Complete with a duration: "Thought for 2m", no mark. */
export const ReasoningCompleteWithDuration: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIReasoningRoot status="complete" duration={120_000}>
        <AIReasoningHeader />
        <AIReasoningContent>{reasoningBody}</AIReasoningContent>
      </AIReasoningRoot>
    </AIMessagesI18nProvider>
  ),
}

/** Complete without a duration (for example loaded from history). */
export const ReasoningCompleteWithoutDuration: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIReasoningRoot status="complete">
        <AIReasoningHeader />
        <AIReasoningContent>{reasoningBody}</AIReasoningContent>
      </AIReasoningRoot>
    </AIMessagesI18nProvider>
  ),
}

/** Complete and open: 3px bar, 16px padding and the reasoning text. */
export const ReasoningCompleteExpanded: Story = {
  render: () => (
    <AIMessagesI18nProvider>
      <AIReasoningRoot status="complete" duration={42_000} defaultExpanded>
        <AIReasoningHeader />
        <AIReasoningContent>
          {reasoningBody}
          <p style={{ margin: 0 }}>
            Three orders are past their promised date.
          </p>
        </AIReasoningContent>
      </AIReasoningRoot>
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
              <AIReasoning defaultExpanded>
                <AIReasoningHeader>
                  {/* Overrides the default My Assistant mark. */}
                  <AIReasoningMark>
                    <IconSparkle />
                  </AIReasoningMark>
                  <AIReasoningLabel>Analyzing orders</AIReasoningLabel>
                  <AIReasoningElapsed />
                  <AIReasoningTrigger />
                </AIReasoningHeader>
                <AIReasoningContent />
              </AIReasoning>
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
          name: /^Done thinking/,
        })
      ).toHaveLength(2)
    )
  },
}

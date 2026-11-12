import type { Meta, StoryObj } from '@storybook/react'
import type { CSSProperties } from 'react'

import '@vtex/shoreline-ai/css'

import { AIThread, AIThreadViewport } from '../../thread'
import {
  ThreadHistorySeed,
  createMockThreadMessages,
  threadStoryShellStyle,
} from '../../thread/stories/thread-story-shared'
import {
  AIMessageAssistant,
  AIMessageParts,
  AIMessageUser,
  AIMessages,
} from '../index'
import { MessagesStoryDecorator } from './decorators'

const meta: Meta<typeof AIMessages> = {
  title: 'shoreline-ai/messages',
  component: AIMessages,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
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

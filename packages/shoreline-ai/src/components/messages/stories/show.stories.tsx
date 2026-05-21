import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline/css'
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

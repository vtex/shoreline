import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline-ai/css'

import { AIMessages } from '../../messages'
import { MessagesStoryDecorator } from '../../messages/stories/decorators'
import { reasoningToolText } from '../../messages/stories/messages-story-shared'
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

/** The reasoning panel as AIMessages draws it: reasoning text and a tool step. */
export const InAMessage: Story = {
  render: () => (
    <ThreadHistorySeed messages={reasoningToolText}>
      <AIMessages />
    </ThreadHistorySeed>
  ),
}

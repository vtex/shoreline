import { expect } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { AIThread, AIThreadViewport } from '../../thread'
import {
  ThreadHistorySeed,
  createMockThreadMessages,
  threadStoryShellStyle,
} from '../../thread/stories/thread-story-shared'
import { AIMessages } from '../index'
import { MessagesStoryDecorator } from './decorators'

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

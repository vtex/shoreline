import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { AIThread, AIThreadViewport } from '../../thread'
import { threadStoryShellStyle } from '../../thread/stories/thread-story-shared'
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

export const DropIn: Story = {
  render: () => <AIMessages />,
}

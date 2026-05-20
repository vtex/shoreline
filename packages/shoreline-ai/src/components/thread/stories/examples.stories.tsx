import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { ThreadStoryDecorator } from './decorators'
import {
  ConversationLabTree,
  NormativeThreadTree,
  threadStoryShellStyle,
} from './thread-story-shared'

const meta: Meta<typeof NormativeThreadTree> = {
  title: 'shoreline-ai/thread',
  component: NormativeThreadTree,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <ThreadStoryDecorator>
        <div style={threadStoryShellStyle}>
          <Story />
        </div>
      </ThreadStoryDecorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof NormativeThreadTree>

export const SingleSurface: Story = {
  render: () => <NormativeThreadTree showEmpty showMessages />,
}

export const HomeRoute: Story = {
  render: () => <NormativeThreadTree showEmpty />,
}

type ConversationLabStory = StoryObj<{ messageCount: number }>

export const ConversationLab: ConversationLabStory = {
  args: {
    messageCount: 12,
  },
  argTypes: {
    messageCount: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
    },
  },
  render: (args) => (
    <ConversationLabTree messageCount={args.messageCount ?? 0} />
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@vtex/shoreline'

import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { AIMessages } from '../../messages'
import { AIStreamDebugPanel } from '../ai-stream-debug-panel'
import {
  DebugDrawer,
  DebugStoryDecorator,
  SendSampleMessage,
} from './decorators'

const meta: Meta<typeof AIStreamDebugPanel> = {
  title: 'shoreline-ai/stream-debug',
  component: AIStreamDebugPanel,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <DebugStoryDecorator>
        <Story />
      </DebugStoryDecorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AIStreamDebugPanel>

export const NextToMessages: Story = {
  render: () => (
    <Flex direction="column" gap="$space-4">
      <SendSampleMessage />
      <AIMessages />
      <AIStreamDebugPanel />
    </Flex>
  ),
}

export const CustomTitle: Story = {
  render: () => (
    <Flex direction="column" gap="$space-4">
      <SendSampleMessage />
      <AIStreamDebugPanel title="Transport debug" />
    </Flex>
  ),
}

export const InDrawer: Story = {
  render: () => (
    <Flex direction="column" gap="$space-4" align="start">
      <Flex gap="$space-2">
        <SendSampleMessage />
        <DebugDrawer />
      </Flex>
      <AIMessages />
    </Flex>
  ),
}

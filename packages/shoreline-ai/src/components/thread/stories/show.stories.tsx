import { expect, within, waitFor } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { ThreadStoryDecorator } from './decorators'
import {
  NormativeThreadTree,
  createMockThreadMessages,
  threadStoryShellStyle,
} from './thread-story-shared'

const meta: Meta<typeof NormativeThreadTree> = {
  title: 'shoreline-ai/thread',
  component: NormativeThreadTree,
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

const shortHistory = createMockThreadMessages(4)
const longHistory = createMockThreadMessages(18, { longText: true })

export const EmptyThread: Story = {
  render: () => <NormativeThreadTree showEmpty />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Welcome')).toBeInTheDocument()
    await expect(
      document.querySelector('[data-sl-ai-thread-viewport-footer]')
    ).toBeTruthy()
  },
}

export const ComposerLoading: Story = {
  render: () => <NormativeThreadTree composerLoading showMessages />,
  play: async () => {
    await expect(
      document.querySelector('[data-sl-ai-composer-skeleton]')
    ).toBeTruthy()
    await expect(document.querySelector('[data-sl-ai-thread]')).toBeTruthy()
  },
}

export const WithMessagesSlot: Story = {
  render: () => (
    <NormativeThreadTree history={shortHistory} showEmpty showMessages />
  ),
}

export const LongConversation: Story = {
  render: () => <NormativeThreadTree history={longHistory} showMessages />,
}

export const ScrollToBottomVisible: Story = {
  render: () => (
    <NormativeThreadTree history={longHistory} showMessages scrollUpOnMount />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const scrollButton = await waitFor(() => {
      const button = canvas.getByRole('button', { name: 'Scroll to bottom' })

      expect(button).toBeEnabled()

      return button
    })

    await expect(scrollButton).toBeVisible()
  },
}

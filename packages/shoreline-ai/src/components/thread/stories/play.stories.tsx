import { expect, userEvent, within, waitFor } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { ThreadStoryDecorator } from './decorators'
import {
  NormativeThreadTree,
  createMockThreadMessages,
  getThreadViewport,
  isThreadViewportNearBottom,
  scrollThreadViewportToTop,
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

const longHistory = createMockThreadMessages(18, { longText: true })

export const EmptyVisible: Story = {
  render: () => (
    <NormativeThreadTree showEmpty composerPlaceholder="Ask anything" />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Welcome')).toBeInTheDocument()
    await expect(
      canvas.getByPlaceholderText('Ask anything')
    ).toBeInTheDocument()
  },
}

export const ScrollToBottomWhenScrolledUp: Story = {
  decorators: [
    (Story) => (
      <ThreadStoryDecorator locale="pt-BR">
        <div style={threadStoryShellStyle}>
          <Story />
        </div>
      </ThreadStoryDecorator>
    ),
  ],
  render: () => <NormativeThreadTree history={longHistory} showMessages />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(() => {
      const viewport = getThreadViewport(canvasElement)

      expect(viewport).toBeTruthy()

      if (viewport) {
        expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight)
      }
    })

    scrollThreadViewportToTop(canvasElement)

    const scrollButton = await waitFor(() => {
      const button = canvas.getByRole('button', {
        name: 'Rolar para o final',
      })

      expect(button).toBeEnabled()

      return button
    })

    await expect(scrollButton).toBeVisible()

    await userEvent.click(scrollButton)

    await waitFor(() => {
      const viewport = getThreadViewport(canvasElement)

      expect(viewport).toBeTruthy()

      if (viewport) {
        expect(isThreadViewportNearBottom(viewport)).toBe(true)
      }
    })
  },
}

export const AutoScrollAfterSend: Story = {
  render: () => (
    <NormativeThreadTree
      history={longHistory}
      showMessages
      composerPlaceholder="Type a message…"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()

    await waitFor(() => {
      const viewport = getThreadViewport(canvasElement)

      expect(viewport).toBeTruthy()

      if (viewport) {
        expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight)
      }
    })

    scrollThreadViewportToTop(canvasElement)

    const input = canvas.getByPlaceholderText('Type a message…')

    await user.type(input, 'Scroll me back down')
    await user.keyboard('{Enter}')

    await waitFor(
      () => {
        expect(
          canvas.getByText(/You said: "Scroll me back down"/)
        ).toBeInTheDocument()
      },
      { timeout: 5000 }
    )

    await waitFor(() => {
      const viewport = getThreadViewport(canvasElement)

      expect(viewport).toBeTruthy()

      if (viewport) {
        expect(isThreadViewportNearBottom(viewport)).toBe(true)
      }
    })
  },
}

import { expect, userEvent, within, waitFor } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

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
  // Deferred to the component review (see shoreline-ai-ci-readiness spec)
  tags: ['skip-test'],
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

const veryLongHistory = createMockThreadMessages(200)

export const LongThreadStaysAtBottom: Story = {
  render: () => (
    <NormativeThreadTree
      history={veryLongHistory}
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

    const viewport = getThreadViewport(canvasElement) as HTMLElement

    viewport.scrollTop = viewport.scrollHeight
    viewport.dispatchEvent(new Event('scroll', { bubbles: true }))

    await waitFor(() => {
      expect(isThreadViewportNearBottom(viewport)).toBe(true)
    })

    const lastMessage = await canvas.findByText('Assistant reply 200')

    await waitFor(() => {
      const viewportRect = viewport.getBoundingClientRect()
      const messageRect = lastMessage.getBoundingClientRect()

      expect(messageRect.bottom).toBeLessThanOrEqual(viewportRect.bottom + 1)
      expect(messageRect.top).toBeGreaterThanOrEqual(viewportRect.top - 1)
    })

    await waitFor(() => {
      // At the bottom the control stays mounted but disabled (not actionable)
      const button = canvas.queryByRole('button', { name: 'Scroll to bottom' })

      if (button) {
        expect(button).toBeDisabled()
      }
    })

    await user.type(
      canvas.getByPlaceholderText('Type a message…'),
      'One more message'
    )
    await user.keyboard('{Enter}')

    await waitFor(
      () => {
        expect(
          canvas.getByText(/You said: "One more message"/)
        ).toBeInTheDocument()
      },
      { timeout: 5000 }
    )

    await waitFor(() => {
      expect(isThreadViewportNearBottom(viewport)).toBe(true)
    })
  },
}

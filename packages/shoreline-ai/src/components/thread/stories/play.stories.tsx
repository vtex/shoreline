import { expect, userEvent, within, waitFor } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import type { AIMessage } from '../../../types'

import '@vtex/shoreline-ai/css'

import { ThreadStoryDecorator } from './decorators'
import { AIMessages } from '../../messages'
import { AIThread, AIThreadViewport } from '../index'
import {
  NormativeThreadTree,
  ThreadHistorySeed,
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

// Built on first use and kept stable: ThreadHistorySeed reloads on a new array
let veryLongHistory: AIMessage[] | undefined

function getVeryLongHistory() {
  veryLongHistory ??= createMockThreadMessages(200)

  return veryLongHistory
}

function expectVisibleInViewport(element: HTMLElement, viewport: HTMLElement) {
  const viewportRect = viewport.getBoundingClientRect()
  const rect = element.getBoundingClientRect()

  expect(rect.bottom).toBeLessThanOrEqual(viewportRect.bottom + 1)
  expect(rect.top).toBeGreaterThanOrEqual(viewportRect.top - 1)
}

export const LongThreadStaysAtBottom: Story = {
  render: () => (
    <NormativeThreadTree
      history={getVeryLongHistory()}
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

    await waitFor(() => expectVisibleInViewport(lastMessage, viewport))

    // At the bottom the control stays mounted but disabled (hidden)
    await expect(
      await canvas.findByRole('button', { name: 'Scroll to bottom' })
    ).toBeDisabled()

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

    await waitFor(() =>
      expectVisibleInViewport(
        canvas.getByText(/You said: "One more message"/),
        viewport
      )
    )
  },
}

const focusRingHistory: AIMessage[] = [
  {
    id: 'focus-user',
    role: 'user',
    createdAt: '2026-05-20T12:00:00.000Z',
    parts: [{ type: 'text', text: 'Why is my order late?' }],
  },
  {
    id: 'focus-assistant',
    role: 'assistant',
    createdAt: '2026-05-20T12:00:01.000Z',
    parts: [
      { type: 'reasoning', text: 'Checking the order', status: 'complete' },
      { type: 'text', text: 'The carrier delayed it.' },
    ],
  },
]

function getFocusRingRect(element: HTMLElement): DOMRect {
  const { outlineWidth, outlineOffset } = getComputedStyle(element)
  const grow =
    Number.parseFloat(outlineWidth) + Number.parseFloat(outlineOffset)
  const rect = element.getBoundingClientRect()

  return new DOMRect(
    rect.x - grow,
    rect.y - grow,
    rect.width + grow * 2,
    rect.height + grow * 2
  )
}

function expectRectInside(inner: DOMRect, outer: DOMRect) {
  expect(inner.left).toBeGreaterThanOrEqual(outer.left)
  expect(inner.right).toBeLessThanOrEqual(outer.right)
  expect(inner.top).toBeGreaterThanOrEqual(outer.top)
  expect(inner.bottom).toBeLessThanOrEqual(outer.bottom)
}

// Canonical tree: AIThreadViewport > AIMessages, with no wrapper adding
// padding. With `padded` the viewport has the 1rem of horizontal padding that
// focus rings at the edge of the messages need (see MESSAGES.md).
function CanonicalMessagesTree(props: {
  history: AIMessage[]
  padded?: boolean
}) {
  return (
    <ThreadHistorySeed messages={props.history}>
      <AIThread>
        <AIThreadViewport
          style={
            props.padded ? { paddingInline: 'var(--sl-space-4)' } : undefined
          }
        >
          <AIMessages />
        </AIThreadViewport>
      </AIThread>
    </ThreadHistorySeed>
  )
}

export const FocusRingsNotClippedInMessages: Story = {
  render: () => <CanonicalMessagesTree history={focusRingHistory} padded />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const trigger = await waitFor(() => {
      const element = canvasElement.querySelector(
        '[data-sl-ai-message-reasoning-trigger]'
      )

      expect(element).toBeInstanceOf(HTMLElement)

      return element as HTMLElement
    })

    const copy = await canvas.findByRole('button', { name: /copy/i })
    const viewport = getThreadViewport(canvasElement) as HTMLElement

    for (const control of [trigger, copy]) {
      const message = control.closest('[data-sl-ai-message]') as HTMLElement

      control.focus()

      await expect(control).toHaveFocus()

      const ring = getFocusRingRect(control)

      // content-visibility: auto paints only inside the message box, so the
      // focus ring must fit inside it.
      expectRectInside(ring, message.getBoundingClientRect())

      // The viewport has overflow-x: hidden, so the ring must also fit
      // inside it. This holds because the viewport has 1rem of horizontal
      // padding; without it the ring at the edge is clipped.
      expectRectInside(ring, viewport.getBoundingClientRect())
    }
  },
}

const longAnswer = Array.from(
  { length: 12 },
  (_, index) =>
    `Paragraph ${index + 1}: the carrier delayed the order because the parcel was held at a regional hub, and the new estimate depends on the next scheduled pickup.`
).join('\n\n')

const widthHistory: AIMessage[] = [
  {
    id: 'width-user',
    role: 'user',
    createdAt: '2026-05-20T12:00:00.000Z',
    parts: [{ type: 'text', text: 'Why is my order late?' }],
  },
  {
    id: 'width-assistant',
    role: 'assistant',
    createdAt: '2026-05-20T12:00:01.000Z',
    parts: [{ type: 'text', text: longAnswer }],
  },
]

export const MessageRowsKeepContainerWidth: Story = {
  render: () => <CanonicalMessagesTree history={widthHistory} />,
  play: async ({ canvasElement }) => {
    const container = await waitFor(() => {
      const element = canvasElement.querySelector('[data-sl-ai-messages]')

      expect(element).toBeInstanceOf(HTMLElement)

      return element as HTMLElement
    })

    const assistant = await waitFor(() => {
      const element = container.querySelector(
        '[data-sl-ai-message-role="assistant"]'
      )

      expect(element).toBeInstanceOf(HTMLElement)

      return element as HTMLElement
    })

    const user = container.querySelector(
      '[data-sl-ai-message-role="user"]'
    ) as HTMLElement

    const viewport = getThreadViewport(canvasElement) as HTMLElement
    const box = container.getBoundingClientRect()

    // The assistant content spans the whole container: the compensation
    // padding must not shrink it.
    const assistantContent = assistant
      .querySelector('[data-sl-ai-message-content]')
      ?.getBoundingClientRect() as DOMRect

    expect(Math.abs(assistantContent.width - box.width)).toBeLessThanOrEqual(1)
    expect(Math.abs(assistantContent.left - box.left)).toBeLessThanOrEqual(1)

    // The user bubble is flush with the right edge of the container.
    const bubble = user
      .querySelector('[data-sl-ai-message-content]')
      ?.getBoundingClientRect() as DOMRect

    expect(Math.abs(bubble.right - box.right)).toBeLessThanOrEqual(1)

    // A row border box only exceeds the container by the compensation
    // padding (--sl-space-4) and never creates horizontal scroll.
    const bleed = Number.parseFloat(getComputedStyle(assistant).paddingLeft)

    for (const row of [assistant, user]) {
      const rect = row.getBoundingClientRect()

      expect(rect.left).toBeGreaterThanOrEqual(box.left - bleed - 1)
      expect(rect.right).toBeLessThanOrEqual(box.right + bleed + 1)
    }

    expect(viewport.scrollWidth - viewport.clientWidth).toBeLessThanOrEqual(
      bleed + 1
    )
  },
}

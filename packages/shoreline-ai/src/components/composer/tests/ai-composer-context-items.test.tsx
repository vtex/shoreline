import type { ReactNode } from 'react'
import {
  describe,
  expect,
  it,
  render,
  screen,
  userEvent,
} from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'
import { vi } from 'vitest'

import { MockRuntimeProvider } from '../../../test-utils'
import {
  AIComposer,
  AIComposerContextItem,
  AIComposerContextItems,
  type AIComposerMessages,
} from '..'

function Harness(props: {
  locale?: string
  messages?: AIComposerMessages
  children: ReactNode
}) {
  const { locale = 'en-US', messages, children } = props

  return (
    <LocaleProvider locale={locale}>
      <MockRuntimeProvider>
        <AIComposer messages={messages}>{children}</AIComposer>
      </MockRuntimeProvider>
    </LocaleProvider>
  )
}

describe('AIComposerContextItems', () => {
  it('renders items as a list', () => {
    render(
      <Harness>
        <AIComposerContextItems>
          <AIComposerContextItem>First</AIComposerContextItem>
          <AIComposerContextItem>Second</AIComposerContextItem>
        </AIComposerContextItems>
      </Harness>
    )

    const list = screen.getByRole('list')
    const items = screen.getAllByRole('listitem')

    expect(items).toHaveLength(2)
    for (const item of items) expect(list).toContainElement(item)
  })
})

describe('AIComposerContextItem', () => {
  it('shows the label and a title for string labels', () => {
    render(
      <Harness>
        <AIComposerContextItems>
          <AIComposerContextItem>
            Post-Checkout Order Finalization
          </AIComposerContextItem>
        </AIComposerContextItems>
      </Harness>
    )

    expect(
      screen.getByText('Post-Checkout Order Finalization')
    ).toHaveAttribute('title', 'Post-Checkout Order Finalization')
  })

  it('omits the title for non-string children', () => {
    render(
      <Harness>
        <AIComposerContextItems>
          <AIComposerContextItem>
            <strong data-testid="rich">Rich</strong>
          </AIComposerContextItem>
        </AIComposerContextItems>
      </Harness>
    )

    expect(screen.getByTestId('rich').parentElement).not.toHaveAttribute(
      'title'
    )
  })

  it('has no remove button without onRemove', () => {
    render(
      <Harness>
        <AIComposerContextItems>
          <AIComposerContextItem>Item</AIComposerContextItem>
        </AIComposerContextItems>
      </Harness>
    )

    expect(screen.queryByRole('button')).toBeNull()
  })

  it('calls onRemove when the remove button is clicked', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()

    render(
      <Harness>
        <AIComposerContextItems>
          <AIComposerContextItem onRemove={onRemove}>
            Item
          </AIComposerContextItem>
        </AIComposerContextItems>
      </Harness>
    )

    await user.click(screen.getByRole('button', { name: 'Remove context' }))

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it.each(['{Enter}', ' '])(
    'calls onRemove once when the remove button is activated with %j',
    async (key) => {
      const user = userEvent.setup()
      const onRemove = vi.fn()

      render(
        <Harness>
          <AIComposerContextItems>
            <AIComposerContextItem onRemove={onRemove}>
              Item
            </AIComposerContextItem>
          </AIComposerContextItems>
        </Harness>
      )

      screen.getByRole('button', { name: 'Remove context' }).focus()
      await user.keyboard(key)

      expect(onRemove).toHaveBeenCalledTimes(1)
    }
  )

  it('localizes the remove label', () => {
    render(
      <Harness locale="pt-BR">
        <AIComposerContextItems>
          <AIComposerContextItem onRemove={() => {}}>
            Item
          </AIComposerContextItem>
        </AIComposerContextItems>
      </Harness>
    )

    expect(
      screen.getByRole('button', { name: 'Remover contexto' })
    ).toBeInTheDocument()
  })

  it('lets the composer messages override the remove label', () => {
    render(
      <Harness messages={{ removeContext: 'Drop it' }}>
        <AIComposerContextItems>
          <AIComposerContextItem onRemove={() => {}}>
            Item
          </AIComposerContextItem>
        </AIComposerContextItems>
      </Harness>
    )

    expect(screen.getByRole('button', { name: 'Drop it' })).toBeInTheDocument()
  })

  it('renders a custom icon', () => {
    render(
      <Harness>
        <AIComposerContextItems>
          <AIComposerContextItem icon={<i data-testid="custom-icon" />}>
            Item
          </AIComposerContextItem>
        </AIComposerContextItems>
      </Harness>
    )

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })
})

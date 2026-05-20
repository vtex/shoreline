import type { ReactNode } from 'react'
import {
  describe,
  expect,
  it,
  render,
  screen,
} from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { LocaleProvider } from '@vtex/shoreline'

import {
  AIThread,
  AIThreadEmpty,
  AIThreadScrollToBottom,
  AIThreadViewport,
  AIThreadViewportFooter,
} from '..'

let threadIsEmpty = true
let isOpeningThread = false

vi.mock('@assistant-ui/react', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@assistant-ui/react')>()

  return {
    ...mod,
    AssistantRuntimeProvider: ({ children }: { children: ReactNode }) => (
      <>{children}</>
    ),
    ThreadPrimitive: {
      Root: ({
        children,
        ...props
      }: {
        children: ReactNode
      } & Record<string, unknown>) => <div {...props}>{children}</div>,
      Viewport: ({
        children,
        ...props
      }: {
        children: ReactNode
      } & Record<string, unknown>) => <div {...props}>{children}</div>,
      ViewportFooter: ({
        children,
      }: {
        children: ReactNode
      }) => <div data-testid="viewport-footer">{children}</div>,
      ScrollToBottom: ({
        children,
        ...props
      }: {
        children: ReactNode
      } & Record<string, unknown>) => (
        <button type="button" {...props}>
          {children}
        </button>
      ),
    },
    useAuiState: (selector: (state: unknown) => unknown) =>
      selector({
        thread: {
          isEmpty: threadIsEmpty,
          isRunning: false,
        },
      }),
  }
})

vi.mock('../../provider/ai-context', () => ({
  useAIContextInternal: () => ({
    runtime: {},
    threadId: null,
    setThreadId: vi.fn(),
    isOpeningThread,
    error: null,
  }),
}))

describe('AIThread', () => {
  it('renders thread root', () => {
    render(
      <AIThread>
        <AIThreadViewport>
          <AIThreadEmpty>Welcome</AIThreadEmpty>
        </AIThreadViewport>
      </AIThread>
    )

    expect(document.querySelector('[data-sl-ai-thread]')).toBeTruthy()
  })
})

describe('AIThreadViewportFooter with scroll control', () => {
  it('renders scroll-to-bottom inside footer above composer slot', () => {
    render(
      <AIThread>
        <AIThreadViewport>
          <AIThreadEmpty>Welcome</AIThreadEmpty>
          <AIThreadViewportFooter>
            <AIThreadScrollToBottom />
            <span>Composer slot</span>
          </AIThreadViewportFooter>
        </AIThreadViewport>
      </AIThread>
    )

    expect(
      document.querySelector('[data-sl-ai-thread-viewport-footer]')
    ).toBeTruthy()
    expect(
      screen.getByRole('button', { name: 'Scroll to bottom' })
    ).toBeInTheDocument()
    expect(screen.getByText('Welcome')).toBeInTheDocument()
    expect(screen.getByText('Composer slot')).toBeInTheDocument()
  })
})

describe('AIThreadEmpty', () => {
  it('shows children when thread is empty and not opening', () => {
    threadIsEmpty = true
    isOpeningThread = false

    render(
      <AIThread>
        <AIThreadViewport>
          <AIThreadEmpty>Welcome</AIThreadEmpty>
        </AIThreadViewport>
      </AIThread>
    )

    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })

  it('hides children when thread has messages', () => {
    threadIsEmpty = false
    isOpeningThread = false

    render(
      <AIThread>
        <AIThreadViewport>
          <AIThreadEmpty>Welcome</AIThreadEmpty>
        </AIThreadViewport>
      </AIThread>
    )

    expect(screen.queryByText('Welcome')).toBeNull()
  })

  it('hides children while thread is opening', () => {
    threadIsEmpty = true
    isOpeningThread = true

    render(
      <AIThread>
        <AIThreadViewport>
          <AIThreadEmpty>Welcome</AIThreadEmpty>
        </AIThreadViewport>
      </AIThread>
    )

    expect(screen.queryByText('Welcome')).toBeNull()
  })
})

describe('AIThreadViewportFooter', () => {
  it('renders footer region inside viewport footer primitive', () => {
    render(
      <AIThread>
        <AIThreadViewport>
          <AIThreadViewportFooter>
            <span>Composer slot</span>
          </AIThreadViewportFooter>
        </AIThreadViewport>
      </AIThread>
    )

    expect(screen.getByText('Composer slot')).toBeInTheDocument()
    expect(
      document.querySelector('[data-sl-ai-thread-viewport-footer]')
    ).toBeTruthy()
  })
})

describe('AIThreadScrollToBottom', () => {
  it('uses locale catalog for accessible label', () => {
    render(
      <LocaleProvider locale="pt-BR">
        <AIThread messages={{ scrollToBottom: 'Rolar para o final' }}>
          <AIThreadViewport>
            <AIThreadScrollToBottom />
          </AIThreadViewport>
        </AIThread>
      </LocaleProvider>
    )

    expect(
      screen.getByRole('button', { name: 'Rolar para o final' })
    ).toBeInTheDocument()
  })
})

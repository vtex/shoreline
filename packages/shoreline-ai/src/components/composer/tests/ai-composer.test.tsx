import type { ComponentPropsWithoutRef, ReactNode } from 'react'
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
  AIComposer,
  AIComposerActions,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
  AIComposerSkeleton,
} from '..'

vi.mock('@assistant-ui/react', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@assistant-ui/react')>()

  return {
    ...mod,
    AssistantRuntimeProvider: ({ children }: { children: ReactNode }) => (
      <>{children}</>
    ),
    ComposerPrimitive: {
      Root: ({
        children,
        ...props
      }: {
        children: ReactNode
      } & Record<string, unknown>) => <form {...props}>{children}</form>,
      Input: (props: ComponentPropsWithoutRef<'textarea'>) => (
        <textarea {...props} />
      ),
      Send: ({ children }: { children: ReactNode }) => <>{children}</>,
      Cancel: ({ children }: { children: ReactNode }) => <>{children}</>,
      AddAttachment: ({ children }: { children: ReactNode }) => <>{children}</>,
      Attachments: ({ children }: { children: () => ReactNode }) => (
        <div data-testid="attachments">{children({ attachment: {} })}</div>
      ),
    },
    AttachmentPrimitive: {
      Remove: ({ children }: { children: ReactNode }) => <>{children}</>,
    },
    useAui: () => ({
      thread: { source: {} },
      composer: () => ({
        setText: vi.fn(),
        send: vi.fn(),
        reset: vi.fn(),
      }),
    }),
    useAuiState: (selector: (state: unknown) => unknown) =>
      selector({
        composer: {
          text: '',
          canSend: false,
          attachments: [],
        },
        thread: { isRunning: false },
      }),
  }
})

vi.mock('../../provider/ai-context', () => ({
  useAIContextInternal: () => ({
    runtime: {},
    threadId: null,
    isOpeningThread: false,
    error: null,
  }),
}))

describe('AIComposer', () => {
  it('renders skeleton when loading without composer form', () => {
    render(
      <LocaleProvider locale="en-US">
        <AIComposer loading>
          <AIComposerField>
            <AIComposerInput />
          </AIComposerField>
        </AIComposer>
      </LocaleProvider>
    )

    expect(
      document.querySelector('[data-sl-ai-composer-skeleton]')
    ).toBeTruthy()
    expect(document.querySelector('[data-sl-ai-composer]')).toBeNull()
  })

  it('defaults to the stacked layout', () => {
    render(
      <LocaleProvider locale="en-US">
        <AIComposer />
      </LocaleProvider>
    )

    expect(document.querySelector('[data-sl-ai-composer]')).toHaveAttribute(
      'data-layout',
      'stacked'
    )
  })

  it.each(['expanded', 'inline'] as const)('sets the %s layout', (layout) => {
    render(
      <LocaleProvider locale="en-US">
        <AIComposer layout={layout} />
      </LocaleProvider>
    )

    expect(document.querySelector('[data-sl-ai-composer]')).toHaveAttribute(
      'data-layout',
      layout
    )
  })

  it('treats an undefined layout as stacked', () => {
    render(
      <LocaleProvider locale="en-US">
        <AIComposer layout={undefined} />
      </LocaleProvider>
    )

    expect(document.querySelector('[data-sl-ai-composer]')).toHaveAttribute(
      'data-layout',
      'stacked'
    )
  })

  it('passes the layout to the skeleton when loading', () => {
    render(
      <LocaleProvider locale="en-US">
        <AIComposer loading layout="inline" />
      </LocaleProvider>
    )

    expect(
      document.querySelector('[data-sl-ai-composer-skeleton]')
    ).toHaveAttribute('data-layout', 'inline')
    expect(document.querySelector('[data-sl-ai-composer]')).toBeNull()
  })

  it('uses pt-BR catalog without messages override', () => {
    render(
      <LocaleProvider locale="pt-BR">
        <AIComposer>
          <AIComposerField>
            <AIComposerInput />
          </AIComposerField>
        </AIComposer>
      </LocaleProvider>
    )

    expect(
      screen.getByPlaceholderText('Pergunte qualquer coisa…')
    ).toBeInTheDocument()
  })

  it('applies partial messages override on root only', () => {
    render(
      <LocaleProvider locale="en-US">
        <AIComposer messages={{ placeholder: 'Custom placeholder' }}>
          <AIComposerField>
            <AIComposerInput />
          </AIComposerField>
        </AIComposer>
      </LocaleProvider>
    )

    expect(
      screen.getByPlaceholderText('Custom placeholder')
    ).toBeInTheDocument()
  })
})

describe('AIComposerSkeleton', () => {
  it('renders standalone skeleton', () => {
    render(<AIComposerSkeleton />)

    expect(
      document.querySelector('[data-sl-ai-composer-skeleton]')
    ).toBeTruthy()
  })

  it('renders one pill with the default layout', () => {
    render(<AIComposerSkeleton />)

    const root = document.querySelector('[data-sl-ai-composer-skeleton]')

    expect(root).toHaveAttribute('data-layout', 'stacked')
    expect(
      document.querySelectorAll('[data-sl-ai-composer-skeleton-pill]')
    ).toHaveLength(1)
  })

  it('marks the inline layout', () => {
    render(<AIComposerSkeleton layout="inline" />)

    expect(
      document.querySelector('[data-sl-ai-composer-skeleton]')
    ).toHaveAttribute('data-layout', 'inline')
  })
})

function WrappedActions() {
  return (
    <AIComposerActions>
      <span data-testid="wrapped-action" />
    </AIComposerActions>
  )
}

describe('AIComposerFooter', () => {
  it('puts actions in the actions slot when wrapped in a Fragment', () => {
    render(
      <AIComposerFooter>
        <span data-testid="start-item" />
        <>
          <span data-testid="fragment-sibling" />
          <AIComposerActions>
            <span data-testid="action" />
          </AIComposerActions>
        </>
      </AIComposerFooter>
    )

    const start = document.querySelector('[data-sl-ai-composer-footer-start]')

    expect(start).toContainElement(screen.getByTestId('start-item'))
    expect(start).toContainElement(screen.getByTestId('fragment-sibling'))
    expect(start).not.toContainElement(screen.getByTestId('action'))
    expect(
      document.querySelector('[data-sl-ai-composer-actions]')
    ).toContainElement(screen.getByTestId('action'))
  })

  it('does not warn about duplicate keys when it flattens Fragments', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <AIComposerFooter>
        <span data-testid="start-item" />
        <>
          <span data-testid="fragment-sibling" />
          <AIComposerActions>
            <span data-testid="action" />
          </AIComposerActions>
        </>
      </AIComposerFooter>
    )

    const keyWarnings = error.mock.calls.filter((call) =>
      String(call[0]).includes('same key')
    )

    error.mockRestore()
    expect(keyWarnings).toEqual([])
  })

  it('keeps non-actions children in the start slot', () => {
    render(
      <AIComposerFooter>
        <span data-testid="one" />
        <>
          <span data-testid="two" />
          <span data-testid="three" />
        </>
      </AIComposerFooter>
    )

    const start = document.querySelector('[data-sl-ai-composer-footer-start]')

    expect(start).toContainElement(screen.getByTestId('one'))
    expect(start).toContainElement(screen.getByTestId('two'))
    expect(start).toContainElement(screen.getByTestId('three'))
  })

  it('leaves a custom wrapper component in the start slot', () => {
    render(
      <AIComposerFooter>
        <WrappedActions />
      </AIComposerFooter>
    )

    expect(
      document.querySelector('[data-sl-ai-composer-footer-start]')
    ).toContainElement(screen.getByTestId('wrapped-action'))
  })
})

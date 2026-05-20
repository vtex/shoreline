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
  AIComposerField,
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
    setThreadId: vi.fn(),
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
})

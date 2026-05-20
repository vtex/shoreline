import { useMemo, useRef, type ReactNode } from 'react'

import { AIProvider } from '../components/provider'
import { createRuntimeBuilder } from '../runtime/builder'
import { useRuntime } from '../runtime/use-runtime'

import { createMockAttachmentHandler } from './mock-attachments'
import { createMockStreamTransport } from './mock-stream-transport'

const DEFAULT_THREAD_ID = 'storybook-conversation'

export type MockRuntimeProviderProps = {
  children: ReactNode
  /** Fixed id, ref-backed id (default), or resolver for tests. */
  threadId?: string | null | (() => string | null)
}

/**
 * Wraps children with {@link AIProvider} and a local mock runtime (stream + attachments).
 * Use in Storybook decorators, Vitest, and component tests — not part of the public package API.
 */
export function MockRuntimeProvider(props: MockRuntimeProviderProps) {
  const { children, threadId: threadIdProp } = props
  const threadIdRef = useRef<string | null>(
    typeof threadIdProp === 'string' || threadIdProp === null
      ? threadIdProp
      : DEFAULT_THREAD_ID
  )

  const built = useMemo(
    () =>
      createRuntimeBuilder()
        .threadId(() => {
          if (typeof threadIdProp === 'function') {
            return threadIdProp()
          }

          return threadIdRef.current
        })
        .transport(createMockStreamTransport())
        .attachments(createMockAttachmentHandler())
        .build(),
    [threadIdProp]
  )
  const runtime = useRuntime(built)

  return <AIProvider runtime={runtime}>{children}</AIProvider>
}

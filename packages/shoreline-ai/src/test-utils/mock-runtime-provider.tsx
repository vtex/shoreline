import { useMemo, type ReactNode } from 'react'

import { AIProvider } from '../components/provider'
import type { AttachmentHandler, StreamTransport } from '../runtime/types'
import type { AIThreadError } from '../types/public'
import type { AIThreadAdapter } from '../types/threads'
import { createRuntimeBuilder } from '../runtime/builder'
import { useRuntime } from '../runtime/use-runtime'

import { createMockAttachmentHandler } from './mock-attachments'
import { createMockStreamTransport } from './mock-stream-transport'

export type MockRuntimeProviderProps = {
  children: ReactNode
  /** Thread adapter passed to the provider. */
  threads?: AIThreadAdapter
  /** Transport used instead of the default mock one. Keep it stable. */
  transport?: StreamTransport
  /** Attachment handler used instead of the default mock one. Keep it stable. */
  attachments?: AttachmentHandler
  /** Called when a run fails. */
  onRunError?: (error: AIThreadError) => void
  /** Passed to the provider. */
  debugStream?: boolean
  /** Passed to the provider. */
  debugMaxRuns?: number
  /** Passed to the provider. */
  debugMaxSteps?: number
}

/**
 * Wraps children with {@link AIProvider} and a local mock runtime (stream + attachments).
 * Use in Storybook decorators, Vitest, and component tests — not part of the public package API.
 */
export function MockRuntimeProvider(props: MockRuntimeProviderProps) {
  const {
    children,
    threads,
    transport,
    attachments,
    onRunError,
    debugStream,
    debugMaxRuns,
    debugMaxSteps,
  } = props
  const built = useMemo(
    () =>
      createRuntimeBuilder()
        .transport(transport ?? createMockStreamTransport())
        .attachments(attachments ?? createMockAttachmentHandler())
        .build(),
    [transport, attachments]
  )
  const runtime = useRuntime(built)

  return (
    <AIProvider
      runtime={runtime}
      threads={threads}
      onRunError={onRunError}
      debugStream={debugStream}
      debugMaxRuns={debugMaxRuns}
      debugMaxSteps={debugMaxSteps}
    >
      {children}
    </AIProvider>
  )
}

/**
 * Creates the runtime from a {@link BuiltRuntime}.
 */

import { useMemo } from 'react'
import { useLocalRuntime } from '@assistant-ui/react'

import type { AIRuntime } from '../types/runtime'
import type { BuiltRuntime } from './types'
import { createAssistantAttachmentAdapter } from './bridge/attachment-bridge'
import { createChatModelAdapterFromTransport } from './create-chat-model-adapter'
import { bindRunObserverHandle, createRunObserverHandle } from './run-observer'
import { wrapRuntime } from './unwrap-runtime'

/**
 * Creates the runtime for a built transport. Pass the result to `AIProvider`.
 * Memoize `built` (for example with `useMemo`) so the runtime is not rebuilt on
 * every render.
 *
 * @status experimental
 * @example
 * const built = useMemo(
 *   () => createRuntimeBuilder().transport(myTransport).build(),
 *   []
 * )
 * const runtime = useRuntime(built)
 */
export function useRuntime(built: BuiltRuntime): AIRuntime {
  const observerHandle = useMemo(() => createRunObserverHandle(), [])

  const chatModelAdapter = useMemo(
    () => createChatModelAdapterFromTransport(built, observerHandle),
    [built, observerHandle]
  )

  const attachmentAdapter = useMemo(() => {
    if (!built.attachmentHandler) return undefined

    return createAssistantAttachmentAdapter(built.attachmentHandler)
  }, [built.attachmentHandler])

  const engine = useLocalRuntime(chatModelAdapter, {
    adapters: attachmentAdapter
      ? { attachments: attachmentAdapter }
      : undefined,
  })

  const runtime = wrapRuntime(engine)

  bindRunObserverHandle(runtime, observerHandle)

  return runtime
}

/**
 * Mounts a {@link BuiltRuntime} on Assistant-UI `LocalRuntime`.
 *
 * Memoize the result of `createRuntimeBuilder()…build()` (e.g. with `useMemo`)
 * so adapters are not recreated every render.
 *
 * @status experimental
 */

import { useMemo } from 'react'
import { useLocalRuntime } from '@assistant-ui/react'

import type { AIRuntime } from '../types/runtime'
import type { BuiltRuntime } from './types'
import { createAssistantAttachmentAdapter } from './bridge/attachment-bridge'
import { createChatModelAdapterFromTransport } from './create-chat-model-adapter'
import { bindRunObserverHandle, createRunObserverHandle } from './run-observer'
import { wrapRuntime } from './unwrap-runtime'

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

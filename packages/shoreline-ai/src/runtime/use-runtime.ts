/**
 * Mounts a {@link BuiltRuntime} on Assistant-UI `LocalRuntime`.
 *
 * Memoize the result of `createRuntimeBuilder()…build()` (e.g. with `useMemo`)
 * so adapters are not recreated every render.
 *
 * @status experimental
 */

import { useMemo } from 'react'
import { useLocalRuntime, type AssistantRuntime } from '@assistant-ui/react'

import type { BuiltRuntime } from './types'
import { createAssistantAttachmentAdapter } from './bridge/attachment-bridge'
import { createChatModelAdapterFromTransport } from './create-chat-model-adapter'
import { bindRunObserverHandle, createRunObserverHandle } from './run-observer'

export function useRuntime(built: BuiltRuntime): AssistantRuntime {
  const observerHandle = useMemo(() => createRunObserverHandle(), [])

  const chatModelAdapter = useMemo(
    () => createChatModelAdapterFromTransport(built, observerHandle),
    [built, observerHandle]
  )

  const attachmentAdapter = useMemo(() => {
    if (!built.attachmentHandler) return undefined

    return createAssistantAttachmentAdapter(built.attachmentHandler)
  }, [built.attachmentHandler])

  const runtime = useLocalRuntime(chatModelAdapter, {
    adapters: attachmentAdapter
      ? { attachments: attachmentAdapter }
      : undefined,
  })

  bindRunObserverHandle(runtime, observerHandle)

  return runtime
}

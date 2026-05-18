/**
 * useRuntime — mounts BuiltRuntime on Assistant-UI LocalRuntime.
 *
 * @status experimental
 */

import { useMemo } from 'react'
import { useLocalRuntime, type AssistantRuntime } from '@assistant-ui/react'

import type { BuiltRuntime } from './types'
import { createAssistantAttachmentAdapter } from './bridge/attachment-bridge'
import { createChatModelAdapterFromTransport } from './create-chat-model-adapter'

export function useRuntime(built: BuiltRuntime): AssistantRuntime {
  const chatModelAdapter = useMemo(
    () => createChatModelAdapterFromTransport(built),
    [built]
  )

  const attachmentAdapter = useMemo(() => {
    if (!built.attachmentHandler) return undefined

    return createAssistantAttachmentAdapter(built.attachmentHandler)
  }, [built.attachmentHandler])

  return useLocalRuntime(chatModelAdapter, {
    adapters: {
      ...(attachmentAdapter ? { attachments: attachmentAdapter as never } : {}),
    },
  })
}

/**
 * Composer-scoped state and actions (draft input, pending attachments).
 *
 * @status experimental
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import { useCallback, useMemo } from 'react'

import { useAIContextInternal } from '../components/provider/ai-context'
import { getRuntimeCore } from '../runtime/runtime-core'
import type { AIAttachment } from '../types/public'
import { useComposerMessage } from '../components/composer/composer-messages-context'
import { toAIAttachment } from '../utils/to-ai-attachment'

export function useAIComposer(): {
  text: string
  disabled: boolean
  attachments: readonly AIAttachment[]
  setText: (text: string) => void
  send: () => void
  reset: () => void
} {
  const { attachmentErrors } = getRuntimeCore(useAIContextInternal().runtime)
  const aui = useAui()

  const text = useAuiState((s) => s.composer.text)
  const canSend = useAuiState((s) => s.composer.canSend)
  const engineAttachments = useAuiState((s) => s.composer.attachments)
  const getMessage = useComposerMessage()
  const attachments = useMemo(
    () =>
      engineAttachments.map((item) =>
        toAIAttachment(item, getMessage, attachmentErrors.get(item.id))
      ),
    [engineAttachments, getMessage, attachmentErrors]
  )

  const setText = useCallback(
    (value: string) => {
      aui.composer.setText(value)
    },
    [aui]
  )

  const send = useCallback(() => {
    aui.composer.send()
  }, [aui])

  const reset = useCallback(() => {
    void aui.composer.reset()
  }, [aui])

  return {
    text,
    disabled: !canSend,
    attachments,
    setText,
    send,
    reset,
  }
}

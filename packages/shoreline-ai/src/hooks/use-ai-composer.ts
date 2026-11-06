/**
 * Composer-scoped state and actions (draft input, pending attachments).
 *
 * @status experimental
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import { useCallback, useMemo } from 'react'

import { useAIContextInternal } from '../components/provider/ai-context'
import type { AIAttachment } from '../types/public'
import { toAIAttachment } from '../utils/to-ai-attachment'

export function useAIComposer(): {
  text: string
  disabled: boolean
  attachments: readonly AIAttachment[]
  setText: (text: string) => void
  send: () => void
  reset: () => void
} {
  useAIContextInternal()
  const aui = useAui()

  const text = useAuiState((s) => s.composer.text)
  const canSend = useAuiState((s) => s.composer.canSend)
  const engineAttachments = useAuiState((s) => s.composer.attachments)
  const attachments = useMemo(
    () => engineAttachments.map(toAIAttachment),
    [engineAttachments]
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

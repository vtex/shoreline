/**
 * Composer-scoped state and actions (draft input, pending attachments).
 *
 * @status experimental
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import type { Attachment } from '@assistant-ui/react'
import { useCallback } from 'react'

import { useAIContextInternal } from '../components/provider/ai-context'

export function useAIComposer(): {
  text: string
  disabled: boolean
  attachments: readonly Attachment[]
  setText: (text: string) => void
  send: () => void
  reset: () => void
} {
  useAIContextInternal()
  const aui = useAui()

  const text = useAuiState((s) => s.composer.text)
  const canSend = useAuiState((s) => s.composer.canSend)
  const attachments = useAuiState((s) => s.composer.attachments)

  const setText = useCallback(
    (value: string) => {
      aui.composer().setText(value)
    },
    [aui]
  )

  const send = useCallback(() => {
    aui.composer().send()
  }, [aui])

  const reset = useCallback(() => {
    void aui.composer().reset()
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

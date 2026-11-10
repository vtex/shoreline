/**
 * Actions for one attachment of the composer, to handle a failed upload.
 *
 * @status experimental
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import { useCallback, useMemo } from 'react'

import { useComposerMessagesContext } from '../components/composer/composer-messages-context'
import { useAIContextInternal } from '../components/provider/ai-context'
import { getRuntimeCore } from '../runtime/runtime-core'
import type { AIAttachment } from '../types/public'
import { toAIAttachment } from '../utils/to-ai-attachment'

/**
 * Returns the attachment of the chip being rendered and the actions to
 * handle it. Use it inside the `children` render prop of
 * `AIComposerAttachments`.
 *
 * `retry` is defined only when the upload failed: it removes the attachment
 * and adds the same file again, as a new attachment with a new `id`. A file
 * rejected for its type, size or count would fail again, so it has no
 * `retry`.
 *
 * @status experimental
 * @example
 * const { attachment, remove, retry } = useAIAttachment()
 */
export function useAIAttachment(): {
  attachment: AIAttachment
  remove: () => void
  retry: (() => void) | undefined
} {
  const aui = useAui()
  const hasAttachment = aui.attachment.source != null
  const engineAttachment = useAuiState((s) =>
    hasAttachment ? s.attachment : null
  )

  if (!engineAttachment) {
    throw new Error('useAIAttachment must be used inside AIComposerAttachments')
  }

  const { runtime } = useAIContextInternal()
  const reason = getRuntimeCore(runtime).attachmentErrors.get(
    engineAttachment.id
  )
  const getMessage = useComposerMessagesContext()
  const attachment = useMemo(
    () => toAIAttachment(engineAttachment, getMessage, reason),
    [engineAttachment, getMessage, reason]
  )
  const { file } = attachment
  const canRetry =
    attachment.status === 'error' &&
    file !== undefined &&
    reason?.code === 'upload-failed'

  const remove = useCallback(() => {
    void aui.attachment().remove()
  }, [aui])

  const retry = useCallback(() => {
    if (!file) return

    // Remove first so the failed file does not count against the limit.
    void aui
      .attachment()
      .remove()
      .then(() => aui.composer().addAttachment(file))
  }, [aui, file])

  return { attachment, remove, retry: canRetry ? retry : undefined }
}

/**
 * Actions for one attachment of the composer, to handle a failed upload.
 *
 * @status experimental
 */

import { useAui, useAuiState, type Attachment } from '@assistant-ui/react'
import { useCallback, useMemo } from 'react'

import { useComposerMessagesContext } from '../components/composer/composer-messages-context'
import { readErrorReason } from '../runtime/bridge/attachment-error'
import type { AIAttachment } from '../types/public'
import { toAIAttachment } from '../utils/to-ai-attachment'

const OUTSIDE_MESSAGE =
  'useAIAttachment must be used inside AIComposerAttachments'

// The engine throws its own error without a provider or an attachment scope.
function useEngineAttachment(): Attachment {
  try {
    return useAuiState((s) => s.attachment)
  } catch {
    throw new Error(OUTSIDE_MESSAGE)
  }
}

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
  const engineAttachment = useEngineAttachment()

  const getMessage = useComposerMessagesContext()
  const attachment = useMemo(
    () => toAIAttachment(engineAttachment, getMessage),
    [engineAttachment, getMessage]
  )
  const { file } = attachment
  const canRetry =
    attachment.status === 'error' &&
    file !== undefined &&
    readErrorReason(engineAttachment.content)?.code === 'upload-failed'

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

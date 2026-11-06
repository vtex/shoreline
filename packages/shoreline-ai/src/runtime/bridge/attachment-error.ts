/**
 * Why an attachment failed, kept on the attachment as data so the composer
 * can show the message in the user's language. Internal.
 */

import type { ThreadUserMessagePart } from '@assistant-ui/react'

import { packExtras, readExtras } from './part-extras'

export type AttachmentErrorReason =
  | { code: 'too-large'; max: number }
  | { code: 'too-many'; max: number }
  | { code: 'upload-failed' }

/** Content to put on a failed attachment so the reason can be read back. */
export function packErrorReason(
  reason: AttachmentErrorReason
): ThreadUserMessagePart[] {
  return [{ type: 'text', text: '', ...packExtras({ errorReason: reason }) }]
}

/** Reads the reason stored by {@link packErrorReason}, if any. */
export function readErrorReason(
  content: readonly ThreadUserMessagePart[] | undefined
): AttachmentErrorReason | undefined {
  for (const part of content ?? []) {
    const reason = readExtras(part as { providerMetadata?: never }).errorReason

    if (reason) return reason as AttachmentErrorReason
  }

  return undefined
}

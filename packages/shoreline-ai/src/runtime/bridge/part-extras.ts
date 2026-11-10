/**
 * Keeps Shoreline-only part fields (metadata, status, file size) next to a
 * content part, so they come back unchanged after the part goes through the
 * thread. Internal.
 */

import type { PartProviderMetadata } from '@assistant-ui/react'

const KEY = 'shoreline'

export type PartExtras = Record<string, unknown>

/** Returns the field to spread into a content part. Omits it when empty. */
export function packExtras(extras: PartExtras): {
  providerMetadata?: PartProviderMetadata
} {
  const entries = Object.entries(extras).filter(
    ([, value]) => value !== undefined
  )

  if (entries.length === 0) return {}

  return {
    providerMetadata: {
      [KEY]: Object.fromEntries(entries),
    } as PartProviderMetadata,
  }
}

/** Reads back what {@link packExtras} stored on a content part. */
export function readExtras(part: {
  type: string
  providerMetadata?: PartProviderMetadata
}): PartExtras {
  return (part.providerMetadata?.[KEY] as PartExtras | undefined) ?? {}
}

import { useAuiState } from '@assistant-ui/react'
import type { PartState } from '@assistant-ui/react'

/**
 * Resolves the index of a part within a message parts list.
 * Matches by object reference first, then by `toolCallId` for tool-call parts
 * whose reference may change during streaming updates.
 * Returns `-1` when no match is found.
 */
export function findMessagePartIndex(
  part: PartState,
  parts: readonly PartState[]
): number {
  const byReference = parts.indexOf(part)

  if (byReference !== -1) {
    return byReference
  }

  if (part.type === 'tool-call') {
    return parts.findIndex(
      (candidate) =>
        candidate.type === 'tool-call' &&
        candidate.toolCallId === part.toolCallId
    )
  }

  return -1
}

/**
 * Returns the 0-based index of the current message part within its message.
 * Falls back to `0` when the part cannot be located in the parts list.
 */
export function useMessagePartIndex(): number {
  const part = useAuiState((state) => state.part)
  const parts = useAuiState((state) => state.message.parts)
  const index = findMessagePartIndex(part, parts)

  return index === -1 ? 0 : index
}

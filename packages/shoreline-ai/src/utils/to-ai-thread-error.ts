import type { AIThreadError, AIThreadErrorType } from '../types/public'

export function toAIThreadError(
  type: AIThreadErrorType,
  cause: unknown
): AIThreadError {
  const message =
    cause instanceof Error ? cause.message : String(cause ?? 'Unknown error')

  return { type, message }
}

/**
 * Returns a unique id. The prefix is used only when `crypto.randomUUID` is not
 * available.
 *
 * @status experimental
 * @example
 * const id = generateId('msg')
 */
export function generateId(prefix = 'id'): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

/**
 * Returns a unique id for a new thread.
 *
 * @status experimental
 * @example
 * const threadId = generateThreadId()
 */
export function generateThreadId(): string {
  return generateId('thread')
}

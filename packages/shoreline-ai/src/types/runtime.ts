/**
 * Runtime type for @vtex/shoreline-ai.
 *
 * @status experimental
 */

/**
 * Runtime returned by `useRuntime`. Pass it to `<AIProvider>`; its contents
 * are not part of the public API.
 *
 * @status experimental
 * @example
 * const runtime: AIRuntime = useRuntime(built)
 */
export interface AIRuntime {
  readonly __shorelineRuntime: true
}

import { useAIThreadListContext } from '../components/provider/ai-context'
import type { AIThreadListState } from '../components/provider/use-thread-list-state'

/**
 * Returns the saved threads and actions to refresh or archive them. The list
 * loads once when the provider mounts. Without a `threads` adapter on
 * `AIProvider`, the list stays empty.
 *
 * @status experimental
 * @example
 * ```tsx
 * const { threads, isLoading, archiveThread } = useAIThreadList()
 *
 * threads.map((thread) => (
 *   <button key={thread.id} onClick={() => archiveThread(thread.id)}>
 *     {thread.title}
 *   </button>
 * ))
 * ```
 */
export function useAIThreadList(): AIThreadListState {
  return useAIThreadListContext()
}

import type { AIMessage, AIThreadData, AIThreadError } from './public'

/**
 * Thread operations backed by your server. Pass it to `AIProvider` as
 * `threads`. Keep the object stable between renders. Only `list` is required.
 *
 * @status experimental
 * @example
 * ```tsx
 * const threads = useMemo<AIThreadAdapter>(
 *   () => ({
 *     list: () => api.listThreads(),
 *     load: (threadId) => api.getMessages(threadId),
 *   }),
 *   []
 * )
 *
 * <AIProvider runtime={runtime} threads={threads}>
 *   <Thread />
 * </AIProvider>
 * ```
 */
export interface AIThreadAdapter {
  /** Lists the threads of the current user. */
  list(): Promise<AIThreadData[]>
  /** Returns the saved messages when a thread opens. */
  load?(threadId: string): Promise<AIMessage[]>
  /** Archives a thread. */
  archive?(threadId: string): Promise<void>
}

/**
 * Value returned by `useAIThreadList`: the saved threads and the actions
 * to refresh or archive them.
 *
 * @status experimental
 * @example
 * const list: AIThreadListState = useAIThreadList()
 */
export interface AIThreadListState {
  threads: AIThreadData[]
  isLoading: boolean
  error: AIThreadError | null
  refresh: () => Promise<void>
  archiveThread: (threadId: string) => Promise<void>
}

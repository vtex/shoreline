import { useCallback, useEffect, useReducer, useRef } from 'react'

import type { AIThreadData, AIThreadError } from '../../types/public'
import type { AIThreadAdapter } from '../../types/threads'
import { toAIThreadError } from '../../utils/to-ai-thread-error'

/**
 * Value returned by `useAIThreadList`: the saved threads and the actions
 * to refresh or archive them.
 *
 * @status experimental
 */
export interface ThreadListState {
  threads: AIThreadData[]
  isLoading: boolean
  error: AIThreadError | null
  refresh: () => Promise<void>
  archiveThread: (threadId: string) => Promise<void>
}

interface ListState {
  threads: AIThreadData[]
  isLoading: boolean
  error: AIThreadError | null
}

type ListAction =
  | { type: 'load_start' }
  | { type: 'load_done'; threads: AIThreadData[] }
  | { type: 'load_failed'; error: AIThreadError }
  | { type: 'archive_start'; id: string }
  | {
      type: 'archive_failed'
      id: string
      archived?: boolean
      error: AIThreadError
    }

function setArchived(
  threads: AIThreadData[],
  id: string,
  archived: boolean | undefined
): AIThreadData[] {
  return threads.map((thread) =>
    thread.id === id ? { ...thread, archived } : thread
  )
}

function reducer(state: ListState, action: ListAction): ListState {
  switch (action.type) {
    case 'load_start':
      return { ...state, isLoading: true, error: null }
    case 'load_done':
      return { threads: action.threads, isLoading: false, error: null }
    case 'load_failed':
      return { ...state, isLoading: false, error: action.error }
    case 'archive_start':
      return { ...state, threads: setArchived(state.threads, action.id, true) }
    case 'archive_failed':
      return {
        ...state,
        threads: setArchived(state.threads, action.id, action.archived),
        error: action.error,
      }
  }
}

const NO_ADAPTER_STATE: ListState = {
  threads: [],
  isLoading: false,
  error: null,
}

/**
 * @internal Keeps the thread list, loads it on mount and handles archive.
 */
export function useThreadListState(adapter?: AIThreadAdapter): ThreadListState {
  const [state, dispatch] = useReducer(
    reducer,
    adapter?.list
      ? { threads: [], isLoading: true, error: null }
      : NO_ADAPTER_STATE
  )

  const adapterRef = useRef(adapter)
  adapterRef.current = adapter
  const threadsRef = useRef(state.threads)
  threadsRef.current = state.threads
  const listRequest = useRef<Promise<void> | null>(null)
  const archiveRequests = useRef(new Map<string, Promise<void>>())

  const refresh = useCallback((): Promise<void> => {
    const list = adapterRef.current?.list

    if (!list) return Promise.resolve()
    if (listRequest.current) return listRequest.current

    dispatch({ type: 'load_start' })

    const request = list
      .call(adapterRef.current)
      .then((threads) => dispatch({ type: 'load_done', threads }))
      .catch((cause) =>
        dispatch({
          type: 'load_failed',
          error: toAIThreadError('thread_list', cause),
        })
      )
      .finally(() => {
        listRequest.current = null
      })

    listRequest.current = request

    return request
  }, [])

  const archiveThread = useCallback((id: string): Promise<void> => {
    const pending = archiveRequests.current.get(id)

    if (pending) return pending

    const archive = adapterRef.current?.archive

    if (!archive) {
      return Promise.reject(
        new Error(
          'Cannot archive a thread: the threads adapter has no archive method.'
        )
      )
    }

    const thread = threadsRef.current.find((item) => item.id === id)

    if (!thread) {
      return Promise.reject(
        new Error(`Cannot archive thread "${id}": it is not in the list.`)
      )
    }

    const previous = thread.archived

    dispatch({ type: 'archive_start', id })

    const request = archive
      .call(adapterRef.current, id)
      .catch((cause) => {
        const error = toAIThreadError('thread_archive', cause)

        dispatch({ type: 'archive_failed', id, archived: previous, error })

        throw cause
      })
      .finally(() => {
        archiveRequests.current.delete(id)
      })

    archiveRequests.current.set(id, request)

    return request
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return {
    threads: state.threads,
    isLoading: state.isLoading,
    error: state.error,
    refresh,
    archiveThread,
  }
}

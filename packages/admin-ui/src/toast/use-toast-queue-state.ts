import { useReducer, useCallback } from 'react'
import type { InternalToastProps } from './types'

export function useToastQueueState() {
  const [{ toasts }, dispatch] = useReducer(queueReducer, {
    toasts: [],
    queue: {},
  })

  const add = useCallback(
    (toast: InternalToastProps) => dispatch({ type: 'enqueue', toast }),
    []
  )

  const remove = useCallback(
    (key: string) => dispatch({ type: 'dequeue', key }),
    []
  )

  return {
    toasts,
    add,
    remove,
  }
}

function queueReducer(
  state: ToastQueueState,
  action: QueueActions
): ToastQueueState {
  switch (action.type) {
    case 'enqueue': {
      const { toast } = action

      const hasExistingToast = state.toasts.some(
        (t) => t.dedupeKey === toast.dedupeKey
      )

      if (hasExistingToast) {
        const { dedupeKey } = toast

        return {
          toasts: state.toasts.map((t) => {
            if (t.dedupeKey === dedupeKey) {
              return {
                ...t,
                shouldRemove: true,
              }
            }

            return t
          }),
          queue: {
            ...state.queue,
            [dedupeKey]: toast,
          },
        }
      }

      return {
        ...state,
        toasts: [...state.toasts, toast],
      }
    }

    case 'dequeue': {
      const toasts = state.toasts.filter(
        ({ dedupeKey }) => dedupeKey !== action.key
      )

      const queuedToast = state.queue[action.key]

      if (queuedToast) {
        return {
          queue: {
            ...state.queue,
            [action.key]: undefined,
          },
          toasts: [...toasts, queuedToast],
        }
      }

      return {
        ...state,
        toasts,
      }
    }
  }
}

type QueueActions =
  | { type: 'enqueue'; toast: InternalToastProps }
  | { type: 'dequeue'; key: string }

export interface ToastQueueState {
  toasts: InternalToastProps[]
  queue: {
    [key: string]: InternalToastProps | undefined
  }
}

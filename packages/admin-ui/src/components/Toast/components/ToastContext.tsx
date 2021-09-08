import type { ReactNode } from 'react'
import React, {
  useContext,
  createContext,
  useReducer,
  useCallback,
  Fragment,
} from 'react'
import { Portal } from 'reakit'

import { ToastQueue } from './ToastQueue'
import type { Toast, InternalToast } from '../types'
import invariant from 'tiny-invariant'

let cachedCounter = 0

type AddToast = (toast: InternalToast) => void

const ToastControllerContext = createContext<AddToast | null>(null)

type Actions =
  | { type: 'enqueue'; toast: InternalToast }
  | { type: 'dequeue'; key: string }

interface ToastState {
  toasts: InternalToast[]
  queue: {
    [key: string]: InternalToast | undefined
  }
}

function reducer(state: ToastState, action: Actions): ToastState {
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

function useToastQueueState() {
  const [{ toasts }, dispatch] = useReducer(reducer, {
    toasts: [],
    queue: {},
  })

  const add = useCallback(
    (toast: InternalToast) => dispatch({ type: 'enqueue', toast }),
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

interface ToastProviderProps {
  children: ReactNode
}

const InternalToastProvider = ({ children }: ToastProviderProps) => {
  const queue = useToastQueueState()

  return (
    <ToastControllerContext.Provider value={queue.add}>
      {children}
      <Portal>
        <ToastQueue toasts={queue.toasts} dequeue={queue.remove} />
      </Portal>
    </ToastControllerContext.Provider>
  )
}

export function ToastProvider(props: ToastProviderProps) {
  const { children } = props
  const currentContext = useContext(ToastControllerContext)

  if (currentContext !== null) {
    return <Fragment>{children}</Fragment>
  }

  return <InternalToastProvider>{children}</InternalToastProvider>
}

export const useToast = () => {
  const toast = useContext(ToastControllerContext)

  invariant(toast, 'No "ToastProvider" configured')

  return useCallback(
    (t: Toast) => {
      const id = `${cachedCounter++}`

      toast({
        ...t,
        id,
        dedupeKey: t.key ?? id,
        shouldRemove: false,
      })
    },
    [toast]
  )
}

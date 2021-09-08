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
  | { type: 'dequeue'; dedupeKey: string }

interface ToastState {
  toasts: InternalToast[]
  queuedToasts: {
    [dedupeKey: string]: InternalToast | undefined
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
          queuedToasts: {
            ...state.queuedToasts,
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
        ({ dedupeKey }) => dedupeKey !== action.dedupeKey
      )

      const queuedToast = state.queuedToasts[action.dedupeKey]

      if (queuedToast) {
        return {
          queuedToasts: {
            ...state.queuedToasts,
            [action.dedupeKey]: undefined,
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
    queuedToasts: {},
  })

  const add = useCallback(
    (toast: InternalToast) => dispatch({ type: 'enqueue', toast }),
    []
  )

  const remove = useCallback(
    (dedupeKey: string) => dispatch({ type: 'dequeue', dedupeKey }),
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
  const addToast = useContext(ToastControllerContext)

  invariant(addToast, 'No "ToastProvider" configured')

  return useCallback(
    (toast: Toast) => {
      const id = `${cachedCounter++}`

      addToast({
        ...toast,
        id,
        dedupeKey: toast.key ?? id,
        shouldRemove: false,
      })
    },
    [addToast]
  )
}

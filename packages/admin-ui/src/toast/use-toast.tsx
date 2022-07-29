import type { ReactNode } from 'react'
import React, { useContext, createContext, useCallback, Fragment } from 'react'
import { Portal } from 'reakit/Portal'
import invariant from 'tiny-invariant'

import { ToastQueue } from './toast-queue'
import type { Toast, InternalToast } from './types'
import { useToastQueueState } from './use-toast-queue-state'

let cachedCounter = 0

type AddToast = (toast: InternalToast) => void

const ToastControllerContext = createContext<AddToast | null>(null)

interface ToastProviderProps {
  children: ReactNode
}

function InternalToastProvider(props: ToastProviderProps) {
  const { children } = props

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

export function useToast() {
  const dispatch = useContext(ToastControllerContext)

  invariant(dispatch, 'No "ToastProvider" configured')

  return useCallback(
    (toast: Toast) => {
      const id = `${cachedCounter++}`

      dispatch({
        ...toast,
        id,
        dedupeKey: toast.key ?? id,
        shouldRemove: false,
      })
    },
    [dispatch]
  )
}

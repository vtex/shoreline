import type { ReactNode } from 'react'
import React, { useContext, createContext, useCallback, Fragment } from 'react'
import { Portal } from 'ariakit'
import invariant from 'tiny-invariant'

import type { ToastProps, InternalToastProps } from './types'
import { useAnimatedList } from './use-animated-list'
import { useToastQueueState } from './use-toast-queue-state'
import { Stack } from '../stack'
import * as style from './toast.style'
import { Toast } from './toast'

let cachedCounter = 0

type AddToast = (toast: InternalToastProps) => void

const ToastControllerContext = createContext<AddToast | null>(null)

interface ToastProviderProps {
  children: ReactNode
}

function InternalToastProvider(props: ToastProviderProps) {
  const { children } = props

  const { add: enqueue, remove: dequeue, toasts } = useToastQueueState()
  const { itemRef, remove } = useAnimatedList()

  const onClear = useCallback(
    (dedupeKey: string, id: string) => {
      remove(id, () => {
        dequeue(dedupeKey)
      })
    },
    [remove, dequeue]
  )

  return (
    <ToastControllerContext.Provider value={enqueue}>
      {children}
      <Portal>
        <Stack space="$space-6" csx={style.toastQueue}>
          {toasts.map(({ id, ...rest }) => (
            <Toast
              ref={itemRef(id)}
              key={id}
              id={id}
              onClear={onClear}
              {...rest}
            />
          ))}
        </Stack>
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

  const show = useCallback(
    (toast: ToastProps) => {
      const {
        message,
        key,
        variant = 'info',
        dismissible = true,
        duration = 10000,
        csx = {},
        action,
      } = toast

      const generatedId = `${cachedCounter++}`

      dispatch({
        shouldRemove: false,
        id: generatedId,
        dedupeKey: key ?? generatedId,
        message,
        variant,
        dismissible,
        action,
        duration,
        csx,
      })
    },
    [dispatch]
  )

  return show
}

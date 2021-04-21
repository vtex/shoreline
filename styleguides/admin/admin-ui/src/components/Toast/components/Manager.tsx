import React, { useEffect, useRef, useState } from 'react'
import { Toast } from './Toast'
import {
  ToastManagerProps,
  ToastManagerState,
  ToastOptions,
  ToastProps,
} from './typings'

/**
 * Manages toasts. This component is responsible for creating toasts,
 * adding and removing them from the stack, as well as rendering them.
 */
export function ToastManager(props: ToastManagerProps) {
  const [state, setState] = useState<ToastManagerState>({
    bottom: [],
  })
  const counter = useRef(0)

  useEffect(() => {
    props.actions({
      notify,
    })
  }, [])

  const removeToast = (id: string) => {
    setState((previousState) => ({
      bottom: previousState.bottom.filter((toast) => toast.id !== String(id)),
    }))
  }

  const createToast = (props: ToastProps): ToastOptions => {
    const { message, position = 'bottom', duration = 5000 } = props

    counter.current += 1
    const id = counter.current

    return {
      id: String(id),
      message,
      position,
      duration,
      remove: removeToast,
    }
  }

  const notify = (props: ToastProps) => {
    const toast = createToast(props)

    setState((previousState) => ({ bottom: [...previousState.bottom, toast] }))

    return toast.id
  }

  return (
    <ul>
      {state.bottom.map((toast) => {
        return <Toast key={toast.id} {...toast} />
      })}
    </ul>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { useSystem } from '@vtex/admin-core'
import { Box } from '@vtex/admin-primitives'
import { Toast } from './Toast'
import {
  ToastManagerProps,
  ToastManagerState,
  ToastOptions,
  ToastProps,
} from './typings'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'

/**
 * Manages toasts. This component is responsible for creating toasts,
 * adding and removing them from the stack, as well as rendering them.
 */
export function ToastManager(props: ToastManagerProps) {
  const { actions } = props
  const { cn } = useSystem()
  const counter = useRef(0)
  const [state, setState] = useState<ToastManagerState>({
    bottom: [],
  })

  useEffect(() => {
    actions({
      notify,
    })
  }, [])

  useEffect(() => {
    if (state.bottom.length === 0) {
      // Resetting the toast count allows us
      // to have consistent animations differentiated
      // by the toast position on the stack.
      counter.current = 0
    }
  }, [state.bottom])

  const removeToast = (id: string) => {
    setState((previousState) => ({
      bottom: previousState.bottom.filter((toast) => toast.id !== String(id)),
    }))
  }

  const createToast = (props: ToastProps): ToastOptions => {
    const { position = 'bottom', duration = 5000 } = props

    counter.current += 1
    const id = counter.current

    return {
      ...props,
      id: String(id),
      position,
      duration,
      remove: removeToast,
      stack: [],
    }
  }

  const notify = (props: ToastProps) => {
    const toast = createToast(props)

    setState((previousState) => ({ bottom: [...previousState.bottom, toast] }))

    return toast.id
  }

  const styles = cn({
    position: 'fixed',
    bottom: '12px',
    left: 0,
    right: 0,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '374px',
    minHeight: '72px',
    listStyle: 'none',
    '> *:not(:last-child)': {
      marginBottom: '12px',
    },
  })

  return (
    <Box data-testid="toast-manager" element="ul" className={styles}>
      <AnimateSharedLayout>
        <AnimatePresence>
          {state.bottom.map((toast) => {
            return (
              <Toast
                key={`${toast.position}-${toast.id}`}
                {...toast}
                stack={state.bottom.map((toast) => toast.id)}
              />
            )
          })}
        </AnimatePresence>
      </AnimateSharedLayout>
    </Box>
  )
}

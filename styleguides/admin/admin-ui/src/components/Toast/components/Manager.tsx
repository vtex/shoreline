import React, { useEffect, useRef, useState } from 'react'
import { useSystem } from '@vtex/admin-core'
import { Box } from '@vtex/admin-primitives'
import { Toast } from './Toast'
import {
  ToastManagerProps,
  ToastManagerState,
  ToastOptions,
  ToastProps,
  ToastPosition,
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
    'bottom-right': [],
  })

  useEffect(() => {
    actions({
      dispatch,
    })
  }, [actions])

  useEffect(() => {
    if (state['bottom-right'].length === 0) {
      // Resetting the toast count allows us
      // to have consistent animations differentiated
      // by the toast position on the stack.
      counter.current = 0
    }
  }, [state['bottom-right'], counter.current])

  const removeToast = (id: string, position: ToastPosition) => {
    setState((previousState) => ({
      ...previousState,
      [position]: previousState[position].filter(
        (toast) => toast.id !== String(id)
      ),
    }))
  }

  const createToast = (props: ToastProps): ToastOptions => {
    const { position = 'bottom-right', duration = 5000 } = props

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

  const dispatch = (props: ToastProps) => {
    const toast = createToast(props)

    setState((previousState) => ({
      ...previousState,
      [toast.position!]: [...previousState[toast.position!], toast],
    }))

    return toast.id
  }

  const styles = cn({
    position: 'fixed',
    bottom: '3rem',
    zIndex: 'over',
    left: 0,
    right: '2rem',
    textAlign: 'center',
    marginLeft: 'auto',
    maxWidth: '23.375rem',
    minHeight: '4.5rem',
    listStyle: 'none',
    '> *:not(:last-child)': {
      marginBottom: '0.75rem',
    },
  })

  return (
    <Box data-testid="toast-manager" element="ul" className={styles}>
      <AnimateSharedLayout>
        <AnimatePresence>
          {state['bottom-right'].map((toast) => {
            return (
              <Toast
                key={`${toast.position}-${toast.id}`}
                {...toast}
                stack={state['bottom-right'].map((toast) => toast.id)}
              />
            )
          })}
        </AnimatePresence>
      </AnimateSharedLayout>
    </Box>
  )
}

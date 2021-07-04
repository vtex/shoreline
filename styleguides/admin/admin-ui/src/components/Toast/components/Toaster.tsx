import React from 'react'
import { useSystem } from '@vtex/admin-core'
import { Box } from '@vtex/admin-primitives'
import { Toast } from './Toast'
import { ToasterProps } from './typings'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'

/**
 * This component is responsible for rendering the toasts.
 * It's a toaster, after all.
 */
export function Toaster(props: ToasterProps) {
  const { state } = props
  const { cn } = useSystem()

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
    <Box data-testid="onda-toaster" element="ul" className={styles}>
      <AnimateSharedLayout>
        <AnimatePresence data-testid="onda-toaster-container">
          {state['bottom-right'].map((toast) => (
            <Toast
              key={`${toast.position}-${toast.id}`}
              {...toast}
              stack={state['bottom-right'].map((toast) => toast.id)}
            />
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </Box>
  )
}

import React from 'react'
import { Box } from '@vtex/admin-primitives'
import { Toast } from './Toast'
import { ToasterProps } from './typings'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { toasterCsx } from './consts'

/**
 * This component is responsible for rendering the toasts.
 * It's a toaster, after all.
 */
export function Toaster(props: ToasterProps) {
  const { state } = props

  return (
    <Box data-testid="onda-toaster" element="ul" csx={toasterCsx}>
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

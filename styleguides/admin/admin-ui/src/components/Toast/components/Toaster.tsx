import React from 'react'
import { tag } from '@vtex/onda-react'
import { Toast } from './Toast'
import { ToasterProps } from './typings'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { StyleObject } from '@vtex/admin-core'

/**
 * This component is responsible for rendering the toasts.
 * It's a toaster, after all.
 */
export function Toaster(props: ToasterProps) {
  const { state } = props

  const csx: StyleObject = {
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
  }

  return (
    <tag.ul data-testid="onda-toaster" csx={csx}>
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
    </tag.ul>
  )
}

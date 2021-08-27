import React, { useEffect, useState, useMemo } from 'react'
import { tag } from '@vtex/admin-ui-react'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import type { StyleObject } from '@vtex/onda-core'

import { Toast } from './Toast'
import type { ToasterProps } from './typings'

const STATE_CHANGE_DELAY = 250
const MIN_HEIGHT_VISIBLE = '4.5rem'
const MIN_HEIGHT_HIDDEN = '0rem'

/**
 * This component is responsible for rendering the toasts.
 * It's a toaster, after all.
 */
export function Toaster(props: ToasterProps) {
  const { state } = props
  const toastStack = useMemo(() => state['bottom-right'], [state])
  const [minHeight, setMinHeight] = useState(MIN_HEIGHT_HIDDEN)

  useEffect(() => {
    const visible = toastStack && toastStack.length > 0

    if (visible) {
      setMinHeight(MIN_HEIGHT_VISIBLE)
    } else {
      /**
       * This delay is needed due framer-motion's AnimateSharedLayout
       */
      setTimeout(() => setMinHeight(MIN_HEIGHT_HIDDEN), STATE_CHANGE_DELAY)
    }
  }, [toastStack])

  const csx: StyleObject = {
    minHeight,
    position: 'fixed',
    bottom: '3rem',
    zIndex: 'over',
    right: '2rem',
    textAlign: 'center',
    marginLeft: 'auto',
    width: '23.375rem',
    listStyle: 'none',
    '> *:not(:last-child)': {
      marginBottom: '0.75rem',
    },
  }

  return (
    <tag.ul data-testid="onda-toaster" csx={csx}>
      <AnimateSharedLayout>
        <AnimatePresence data-testid="onda-toaster-container">
          {toastStack.map((toast) => (
            <Toast
              key={`${toast.position}-${toast.id}`}
              {...toast}
              stack={toastStack.map((toast) => toast.id)}
            />
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </tag.ul>
  )
}

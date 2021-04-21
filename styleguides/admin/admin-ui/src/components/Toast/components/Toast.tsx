import React, { useEffect } from 'react'
import { Box } from '@vtex/admin-primitives'
import { ToastOptions } from './typings'

/**
 * The toast is a variation of an alert that provides immediate
 * feedback over actions that just happened, and were caused by the user.
 */
export function Toast(props: ToastOptions) {
  const { message, duration, remove, id } = props

  useEffect(() => {
    setTimeout(() => {
      remove(id)
    }, duration)
  }, [])

  return <Box>{message}</Box>
}

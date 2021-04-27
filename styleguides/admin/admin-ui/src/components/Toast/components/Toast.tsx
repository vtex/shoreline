import React, { useEffect } from 'react'
import { Flex } from '@vtex/admin-primitives'
import { StyleProp } from '@vtex/admin-core'
import { ToastOptions, ToastType } from './typings'
import { ToastIcon } from './Icon'

/**
 * The toast is a variation of an alert that provides immediate
 * feedback over actions that just happened, and were caused by the user.
 */
export function Toast(props: ToastOptions) {
  const { message, duration, csx, remove, id, type } = useToast(props)

  useEffect(() => {
    setTimeout(() => {
      remove(id)
    }, duration)
  }, [])

  return (
    <Flex csx={csx} justify="space-between" align="center">
      <Flex align="center">
        <ToastIcon type={type} />
        {message}
      </Flex>
    </Flex>
  )
}

function useToast(props: ToastOptions) {
  const { type = 'info' } = props

  const csx = setCsx(type)

  return {
    csx,
    type,
    ...props,
  }
}

function setCsx(type: ToastType) {
  const commonCsx: StyleProp = {
    minWidth: '258px',
    width: 'auto',
    minHeight: '72px',
    maxHeight: '72px',
    borderRadius: '4px',
    padding: '16px',
    boxShadow: 'subtle',
    backgroundColor: 'white',
    border: 'default',
  }

  switch (type) {
    case 'error':
      return {
        ...commonCsx,
        backgroundColor: '#FFF8F8',
        borderColor: '#EDB6B6',
      } as StyleProp
    case 'warning':
      return {
        ...commonCsx,
        backgroundColor: '#FFF9EE',
        borderColor: '#E5C38E',
      } as StyleProp
    case 'success':
      return {
        ...commonCsx,
        backgroundColor: '#F0F8F5',
        borderColor: '#8FC2B1',
      } as StyleProp
    case 'info':
    default:
      return {
        ...commonCsx,
        color: 'blue',
      } as StyleProp
  }
}

import React, { useEffect } from 'react'
import { Flex } from '@vtex/admin-primitives'
import { IconClose } from '@vtex/admin-ui-icons'
import { merge, StyleProp } from '@vtex/admin-core'
import { ToastIconProps, ToastOptions, ToastType } from './typings'
import { ToastIcon } from './Icon'
import { Button } from '../../Button'

/**
 * The toast is a variation of an alert that provides immediate
 * feedback over actions that just happened, and were caused by the user.
 * It displays a message that goes away after a set period of time.
 */
export function Toast(props: ToastOptions) {
  const {
    message,
    duration,
    csx,
    remove,
    id,
    iconProps,
    dismissible,
  } = useToast(props)

  useEffect(() => {
    setTimeout(() => {
      remove(id)
    }, duration)
  }, [])

  const handleOnDismiss = () => {
    remove(id)
  }

  return (
    <Flex csx={csx} justify="space-between" align="center">
      <Flex align="center">
        <ToastIcon {...iconProps} />
        {message}
      </Flex>
      {dismissible && (
        <Flex align="center">
          <Button
            icon={<IconClose />}
            variant="adaptative-dark"
            onClick={handleOnDismiss}
          />
        </Flex>
      )}
    </Flex>
  )
}

function useToast(props: ToastOptions) {
  const { type = 'info', iconProps: maybeIconProps, csx: maybeCsx } = props

  const iconProps: ToastIconProps = {
    ...maybeIconProps,
    type,
  }

  const csx = merge(setCsx(type), maybeCsx)

  return {
    csx,
    type,
    ...props,
    iconProps,
  }
}

function setCsx(type: ToastType) {
  const styles: StyleProp = {
    minWidth: '258px',
    width: 'auto',
    minHeight: '72px',
    height: 'auto',
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
        ...styles,
        backgroundColor: '#FFF8F8',
        borderColor: '#EDB6B6',
      } as StyleProp
    case 'warning':
      return {
        ...styles,
        backgroundColor: '#FFF9EE',
        borderColor: '#E5C38E',
      } as StyleProp
    case 'success':
      return {
        ...styles,
        backgroundColor: '#F0F8F5',
        borderColor: '#8FC2B1',
      } as StyleProp
    case 'info':
    default:
      return styles
  }
}

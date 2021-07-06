import React, { useEffect, useMemo } from 'react'
import { Flex } from '@vtex/admin-primitives'
import { IconClose } from '@vtex/admin-ui-icons'
import { merge, StyleObject, StyleProp } from '@vtex/admin-core'
import { tag } from '@vtex/onda-react'
import { ToastIconProps, ToastOptions, ToastType } from './typings'
import { ToastIcon } from './Icon'
import { Button, ButtonProps } from '../../Button'
import { Text } from '../../Text'
import { motion } from 'framer-motion'
import {
  toastErrorCsx,
  toastCsx,
  toastSuccessCsx,
  toastWarningCsx,
} from './consts'

/**
 * The toast is a variation of an alert that provides immediate
 * feedback over actions that just happened and were caused by the user.
 *
 * It displays a message that goes away after a set period.
 */
export function Toast(props: ToastOptions) {
  const {
    message,
    duration,
    csx = {},
    remove,
    id,
    iconProps,
    position = 'bottom-right',
    dismissible,
    stack,
    action,
  } = useToast(props)
  useEffect(() => {
    const timeout = setTimeout(() => remove(id, position), duration)

    return () => clearTimeout(timeout)
  }, [])

  const handleOnDismiss = () => {
    remove(id, position)
  }

  const isFirst = useMemo(() => {
    return (
      stack
        .slice(0)
        .reverse()
        .findIndex((toastId) => toastId === id) === 0
    )
  }, [stack])

  return (
    <tag.div
      as={motion.div}
      layout
      data-testid="onda-toast-component"
      csx={csx as StyleObject}
      initial={{ top: '7.5rem' }}
      animate={{ top: 0 }}
      exit={{
        opacity: isFirst ? 1 : 0,
        top: isFirst ? '7.5rem' : 0,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <Flex align="center">
        <ToastIcon {...iconProps} />
        <Text csx={{ textAlign: 'start' }}>{message}</Text>
      </Flex>
      {(dismissible || action) && (
        <Flex align="center">
          {action && <Button {...action} />}
          {dismissible && (
            <Button
              icon={<IconClose />}
              variant="adaptative-dark"
              onClick={handleOnDismiss}
              size="small"
              aria-label="Close toast"
            />
          )}
        </Flex>
      )}
    </tag.div>
  )
}

function useToast(props: ToastOptions): ToastOptions {
  const {
    type = 'info',
    iconProps: maybeIconProps,
    csx: customCsx,
    action: maybeAction,
  } = props

  const iconProps: ToastIconProps = {
    ...maybeIconProps,
    type,
  }

  const csx: StyleProp = merge(getCsx(type), customCsx)

  const action: ButtonProps | undefined = maybeAction
    ? {
        ...maybeAction,
        variant: 'adaptative-dark',
        csx: {
          color: 'blue',
          whiteSpace: 'nowrap',
        },
      }
    : undefined

  return {
    type,
    ...props,
    csx,
    action,
    iconProps,
  }
}

function getCsx(type: ToastType): StyleProp {
  switch (type) {
    case 'error':
      return {
        ...toastCsx,
        ...toastErrorCsx,
      } as StyleProp
    case 'warning':
      return {
        ...toastCsx,
        ...toastWarningCsx,
      } as StyleProp
    case 'success':
      return {
        ...toastCsx,
        ...toastSuccessCsx,
      } as StyleProp
    case 'info':
    default:
      return toastCsx
  }
}

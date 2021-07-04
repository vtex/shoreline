import React, { useEffect, useMemo } from 'react'
import { Flex } from '@vtex/admin-primitives'
import { IconClose } from '@vtex/admin-ui-icons'
import { merge, StyleProp, useSystem } from '@vtex/admin-core'
import { ToastIconProps, ToastOptions, ToastType } from './typings'
import { ToastIcon } from './Icon'
import { Button, ButtonProps } from '../../Button'
import { Text } from '../../Text'
import { motion } from 'framer-motion'
import { errorStyles, styles, successStyles, warningStyles } from './consts'

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
    csx,
    remove,
    id,
    iconProps,
    position = 'bottom-right',
    dismissible,
    stack,
    action,
  } = useToast(props)
  const { cn } = useSystem()

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
    <motion.div
      layout
      data-testid="onda-toast-component"
      className={cn(csx!)}
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
    </motion.div>
  )
}

function useToast(props: ToastOptions): ToastOptions {
  const {
    type = 'info',
    iconProps: maybeIconProps,
    csx: maybeCsx,
    action: maybeAction,
  } = props

  const iconProps: ToastIconProps = {
    ...maybeIconProps,
    type,
  }

  const styles: StyleProp = merge(setCsx(type), maybeCsx)

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
    csx: styles,
    action,
    iconProps,
  }
}

function setCsx(type: ToastType): StyleProp {
  switch (type) {
    case 'error':
      return {
        ...styles,
        ...errorStyles,
      } as StyleProp
    case 'warning':
      return {
        ...styles,
        ...warningStyles,
      } as StyleProp
    case 'success':
      return {
        ...styles,
        ...successStyles,
      } as StyleProp
    case 'info':
    default:
      return styles
  }
}

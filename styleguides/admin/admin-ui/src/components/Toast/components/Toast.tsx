import React, { useEffect, useMemo } from 'react'
import { Flex } from '@vtex/admin-primitives'
import { IconClose } from '@vtex/admin-ui-icons'
import { merge, StyleProp, useSystem } from '@vtex/admin-core'
import { ToastIconProps, ToastOptions, ToastType } from './typings'
import { ToastIcon } from './Icon'
import { Button, ButtonProps } from '../../Button'
import { Text } from '../../Text'
import { motion } from 'framer-motion'

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
    dismissible,
    stack,
    action,
  } = useToast(props)
  const { cn } = useSystem()

  useEffect(() => {
    setTimeout(() => {
      remove(id)
    }, duration)
  }, [])

  const handleOnDismiss = () => {
    remove(id)
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
      data-testid="toast"
      className={cn(csx)}
      initial={{ top: 84 }}
      animate={{ top: 0 }}
      exit={{
        opacity: isFirst ? 1 : 0,
        top: isFirst ? 84 : 0,
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

function useToast(props: ToastOptions) {
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

  const csx = merge(setCsx(type), maybeCsx)

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
    csx,
    type,
    ...props,
    action,
    iconProps,
  }
}

function setCsx(type: ToastType) {
  const styles: StyleProp = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '16.125rem',
    width: 'auto',
    minHeight: '4.5rem',
    height: 'auto',
    maxHeight: '4.5rem',
    borderRadius: '0.25rem',
    padding: '1rem',
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

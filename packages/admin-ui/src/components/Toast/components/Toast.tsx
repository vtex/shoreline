import React, { useEffect, useMemo } from 'react'
import { IconClose } from '@vtex/admin-ui-icons'
import { jsx } from '@vtex/admin-ui-react'
import { motion } from 'framer-motion'

import type { ToastIconProps, ToastOptions } from './typings'
import { ToastIcon } from './Icon'
import type { ButtonProps } from '../../Button'
import { Button } from '../../Button'
import { Text } from '../../Text'
import { Flex } from '../../Flex'

const ToastContent = jsx(motion.div)({
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
  variants: {
    type: {
      // Important! Although these hexes below
      // are "hardcoded" and don't correspond to
      // any color defined on the Design System
      // level, they were defined on the component
      // level and share the same styles with the
      // Alert component. We're actively discussing
      // how we can include these colors on the Design
      // System level.
      error: {
        backgroundColor: '#FFF8F8',
        borderColor: '#EDB6B6',
      },
      success: { backgroundColor: '#F0F8F5', borderColor: '#8FC2B1' },
      warning: { backgroundColor: '#FFF9EE', borderColor: '#E5C38E' },
      info: {},
    },
  },
})

ToastContent.defaultProps = {
  type: 'info',
}

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
    remove,
    id,
    iconProps,
    position = 'bottom-right',
    dismissible,
    csx,
    stack,
    action,
    type,
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
    <ToastContent
      layout
      type={type}
      csx={csx}
      data-testid="onda-toast-component"
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
    </ToastContent>
  )
}

function useToast(props: ToastOptions): ToastOptions {
  const {
    type = 'info',
    iconProps: maybeIconProps,
    action: maybeAction,
  } = props

  const iconProps: ToastIconProps = {
    ...maybeIconProps,
    type,
  }

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
    action,
    iconProps,
  }
}

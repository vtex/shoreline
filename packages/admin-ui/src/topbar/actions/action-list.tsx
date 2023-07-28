import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { cx, Stack } from '@vtex/admin-ui'
import { actionListTheme } from './actions.css'

export function ActionList(props: ComponentPropsWithoutRef<'div'>) {
  const { children, className = '', ...restProps } = props

  return (
    <Stack
      space="$space-0"
      className={cx(actionListTheme, className)}
      fluid
      {...restProps}
    >
      {children}
    </Stack>
  )
}

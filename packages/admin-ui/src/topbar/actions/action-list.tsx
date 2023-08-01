import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { Stack } from '../../stack'
import { actionListTheme } from './actions.css'
import { cx } from '@vtex/admin-ui-core'

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

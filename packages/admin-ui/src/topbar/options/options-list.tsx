import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { cx, Stack } from '@vtex/admin-ui'
import { optionsListTheme } from './options.css'

export function OptionsList(props: ComponentPropsWithoutRef<'div'>) {
  const { children, className = '', ...restProps } = props

  return (
    <Stack
      space="$space-0"
      className={cx(optionsListTheme, className)}
      fluid
      {...restProps}
    >
      {children}
    </Stack>
  )
}

import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { Flex } from '../flex'
import { Stack } from '../stack'
import { cx } from '@vtex/admin-ui-core'
import { topbarTheme } from './topbar.css'

export function Topbar(props: TopbarProps) {
  const { children, className = '', ...restProps } = props

  return (
    <div className={cx(topbarTheme, className)} {...restProps}>
      {children}
    </div>
  )
}

export type TopbarProps = ComponentPropsWithoutRef<'div'>

export function TopbarItem(props: TopbarItemProps) {
  const { children, justify = 'start', ...restProps } = props

  return (
    <Flex justify={justify} align="center" {...restProps}>
      <Stack direction="row" space={{ mobile: '$space-2', tablet: '$space-1' }}>
        {children}
      </Stack>
    </Flex>
  )
}

export interface TopbarItemProps extends ComponentPropsWithoutRef<'div'> {
  justify?: 'end' | 'start' | 'center'
}

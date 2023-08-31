import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { cx } from '@vtex/admin-ui'

import { cellTheme } from './tokens-grid.css'

export function Cell(props: ComponentPropsWithoutRef<'div'>) {
  const { className = '', ...restProps } = props

  return <div className={cx(cellTheme, className)} {...restProps} />
}

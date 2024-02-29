import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { cx } from '@vtex/shoreline-utils'

import styles from './cell.module.css'

export function Cell(props: ComponentPropsWithoutRef<'div'>) {
  const { className = '', ...restProps } = props

  return <div className={cx(styles.cell, className)} {...restProps} />
}

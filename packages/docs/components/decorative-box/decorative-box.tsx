import React from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import styles from './decorative-box.module.css'
import { cx, style } from '@vtex/shoreline'

export function DecorativeBox(props: DecorativeBoxProps) {
  const {
    style: styleOverride,
    height = '100%',
    className = '',
    color = 'gray',
    ...rest
  } = props

  return (
    <div
      style={style({
        '--sl-local-height': height,
        '--sl-local-bg': `var(--sl-color-${color}-3)`,
        '--sl-local-bc': `var(--sl-color-${color}-6)`,
        ...styleOverride,
      })}
      className={cx(styles.decorativeBox, className)}
      {...rest}
    />
  )
}

interface DecorativeBoxProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Component height
   * @default '100%''
   */
  height?: string
  /**
   * Decorative color
   * @default 'gray'
   */
  color?:
    | 'gray'
    | 'green'
    | 'purple'
    | 'blue'
    | 'red'
    | 'cyan'
    | 'teal'
    | 'orange'
    | 'yellow'
}

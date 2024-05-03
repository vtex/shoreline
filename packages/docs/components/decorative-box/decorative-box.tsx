import type { ComponentPropsWithoutRef } from 'react'

import styles from './decorative-box.module.css'
import { cx, style } from '@vtex/shoreline'

export function DecorativeBox(props: DecorativeBoxProps) {
  const {
    style: styleOverride,
    height = '100%',
    width = '100%',
    className = '',
    color = 'gray',
    subtle = false,
    ...rest
  } = props

  return (
    <div
      data-subtle={subtle}
      style={style({
        '--sl-local-height': height,
        '--sl-local-width': width,
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
   * Component width
   * @default '100%''
   */
  width?: string
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
  subtle?: boolean
}

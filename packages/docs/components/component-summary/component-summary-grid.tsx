import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import React from 'react'
import styles from './component-summary-grid.module.css'

export function ComponentSummaryGrid(props: ComponentSummaryGridProps) {
  const { children, rows = 3, style, ...restProps } = props

  return (
    <div
      className={styles.grid}
      {...restProps}
      style={
        {
          ...style,
          '--rows': rows,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

interface ComponentSummaryGridProps extends ComponentPropsWithoutRef<'div'> {
  rows?: number
}

import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import React from 'react'
import { cx } from '@vtex/shoreline-utils'

export function RelatedComponentList(props: RelatedComponentListProps) {
  const { children, num = 3, className, style, ...restProps } = props

  return (
    <div
      className={cx(
        'nextra-cards nx-mt-4 nx-gap-4 nx-grid nx-not-prose',
        className
      )}
      {...restProps}
      style={
        {
          ...style,
          '--rows': num,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

interface RelatedComponentListProps extends ComponentPropsWithoutRef<'div'> {
  num?: number
}

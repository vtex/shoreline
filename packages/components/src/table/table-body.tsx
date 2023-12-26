import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Compose } from '@vtex/shoreline-primitives'
import './table-body.css'

export const TableBody = forwardRef<HTMLDivElement, TableBodyProps>(
  function TableBody(props, ref) {
    const { asChild = false, ...otherProps } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp role="presentation" data-sl-table-body ref={ref} {...otherProps} />
    )
  }
)

export interface TableBodyProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}

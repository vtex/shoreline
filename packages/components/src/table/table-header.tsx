import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '../compose'

export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(
  function TableHeader(props, ref) {
    const { asChild = false, ...otherProps } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp
        role="presentation"
        data-sl-table-header
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface TableHeaderProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}

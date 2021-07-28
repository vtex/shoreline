import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StyleObject } from '@vtex/admin-core'

import { Toolbar, useToolbarState } from '../../Toolbar'
import type { ButtonProps } from '../../Button'
import { Button } from '../../Button'

function TableToolbarButton(props: ButtonProps) {
  const { variant = 'adaptative-dark', size = 'small', ...buttonProps } = props

  return (
    <Toolbar.Item>
      {(itemProps) => (
        <Button variant={variant} size={size} {...itemProps} {...buttonProps} />
      )}
    </Toolbar.Item>
  )
}

const _TableToolbar = forwardRef(function TableToolbar(
  props: TableToolbarProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, csx } = props

  const toolbarState = useToolbarState({ loop: true })

  return (
    <Toolbar
      spacing={0}
      state={toolbarState}
      ref={ref}
      csx={{ padding: 0, ...csx }}
    >
      {children}
    </Toolbar>
  )
})

export const TableToolbar = Object.assign(_TableToolbar, {
  Button: TableToolbarButton,
})

export interface TableToolbarProps {
  children?: ReactNode
  csx?: StyleObject
}

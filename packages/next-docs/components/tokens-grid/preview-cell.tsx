import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { Cell } from './cell'
import { previewCellTheme } from './tokens-grid.css'

export function PreviewCell(props: PreviewCellProps) {
  const { foundation, token, ...restProps } = props

  return (
    <Cell {...restProps}>
      <div
        data-foundation={foundation}
        style={{ '--preview-cell-token-value': token.value } as any}
        className={previewCellTheme}
      />
    </Cell>
  )
}

interface PreviewCellProps extends ComponentPropsWithoutRef<'div'> {
  foundation: Foundation
  token: Token
}

export type Foundation = 'color' | 'spacing' | 'border' | 'radii' | 'typography'

interface Token {
  value: string
  variable: string
  name: string
}

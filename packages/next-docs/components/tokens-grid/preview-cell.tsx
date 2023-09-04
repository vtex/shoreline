import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { Cell } from './cell'
import { previewCellTheme } from './tokens-grid.css'
import type { Foundation } from './theme-utils'

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

interface Token {
  value: string
  variable: string
  name: string
}

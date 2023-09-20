import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { Cell } from './cell'
import { previewCellTheme } from './tokens-grid.css'
import type { Foundation } from './theme-utils'

export function PreviewCell(props: PreviewCellProps) {
  const { foundation, token, ...restProps } = props

  return (
    <Cell {...restProps} data-type="preview">
      <div
        data-foundation={foundation}
        style={
          {
            '--preview-cell-token-value': token.value,
            '--preview-cell-text-letter-spacing': `var(${token.variable}-letter-spacing)`,
            '--preview-cell-text-font': `var(${token.variable}-font)`,
          } as any
        }
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

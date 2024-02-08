import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { Cell } from './cell'

import type { Foundation } from './theme-utils'
import type { CSSProperties } from '@vtex/shoreline-utils'
import styles from './preview-cell.module.css'

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
          } as CSSProperties
        }
        className={styles.previewCell}
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

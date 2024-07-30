import type { ComponentPropsWithoutRef } from 'react'
import { Cell } from './cell'

import type { Foundation } from './theme-utils'
import type { CSSProperties } from '@vtex/shoreline-utils'
import styles from './preview-cell.module.css'

export function PreviewCell(props: PreviewCellProps) {
  const { foundation, value, variable, ...restProps } = props

  return (
    <Cell {...restProps} data-type="preview">
      <div
        data-foundation={foundation}
        style={
          {
            '--preview-cell-token-value': value,
            '--preview-cell-text-letter-spacing': `var(${variable}-letter-spacing)`,
            '--preview-cell-text-font': `var(${variable}-font)`,
          } as CSSProperties
        }
        className={styles.previewCell}
      />
    </Cell>
  )
}

interface PreviewCellProps extends ComponentPropsWithoutRef<'div'> {
  foundation: Foundation

  value: string
  variable: string
}

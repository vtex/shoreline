import type { CSSProperties } from 'react'
import { Fragment } from 'react'

import {
  getFoundationTokens,
  type Foundation,
  getTokenValues,
} from './theme-utils'
import { PreviewCell } from './preview-cell'
import { TokenCell } from './token-cell'
import { Cell } from './cell'
import { Head } from './head'
import { variables } from '../../shoreline/theme'
import styles from './grid.module.css'

export function TokensGrid(props: TokensTableProps) {
  const { foundation = 'color' } = props

  return (
    <div
      style={variables as CSSProperties}
      data-foundation={foundation}
      className={styles.grid}
    >
      <Head>Token</Head>
      <Head>Value</Head>
      {foundation === 'breakpoint' ? null : <Head>Preview</Head>}
      {getFoundationTokens(foundation).map((token) => {
        const {
          variable,
          value,
          foundation: resolvedFoundation,
        } = getTokenValues(token, foundation)

        return (
          <Fragment key={variable}>
            <TokenCell>{variable}</TokenCell>
            <Cell>{value}</Cell>
            {foundation === 'breakpoint' ? null : (
              <PreviewCell
                foundation={resolvedFoundation}
                variable={variable}
                value={value}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

interface TokensTableProps {
  foundation?: Foundation
}

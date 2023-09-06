import React, { Fragment } from 'react'

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
import { gridTheme } from './tokens-grid.css'

export function TokensGrid(props: TokensTableProps) {
  const { foundation = 'color' } = props

  return (
    <div
      style={variables as any}
      data-foundation={foundation}
      className={gridTheme}
    >
      <Head>Token</Head>
      <Head>CSS Variable</Head>
      <Head>Value</Head>
      {foundation === 'breakpoint' ? null : <Head>Preview</Head>}
      {getFoundationTokens(foundation).map((token) => {
        const {
          name,
          variable,
          value,
          foundation: resolvedFoundation,
        } = getTokenValues(token, foundation)

        return (
          <Fragment key={name}>
            <TokenCell>{name}</TokenCell>
            <Cell>{variable}</Cell>
            <Cell>{value}</Cell>
            {foundation === 'breakpoint' ? null : (
              <PreviewCell
                foundation={resolvedFoundation}
                token={{ name, variable, value }}
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

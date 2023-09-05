import { csx } from '@vtex/admin-ui'
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

export function TokensGrid(props: TokensTableProps) {
  const { foundation = 'color' } = props

  return (
    <div
      style={variables as any}
      className={csx({
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 1fr 1fr',
      })}
    >
      <Head>Token</Head>
      <Head>CSS Variable</Head>
      <Head>Value</Head>
      <Head>Preview</Head>
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
            <PreviewCell
              foundation={resolvedFoundation}
              token={{ name, variable, value }}
            />
          </Fragment>
        )
      })}
    </div>
  )
}

interface TokensTableProps {
  foundation?: Foundation
}

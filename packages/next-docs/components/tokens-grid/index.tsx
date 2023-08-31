import { csx } from '@vtex/admin-ui'
import React from 'react'

import type { Foundation } from './preview-cell'
import { PreviewCell } from './preview-cell'
import { TokenCell } from './token-cell'
import { Cell } from './cell'
import { Head } from './head'

const colorTokens = [
  {
    name: '$color-gray-0',
    variable: '--sl-color-gray-0',
    value: '#FFFFFF',
  },
  {
    name: '$color-gray-1',
    variable: '--sl-color-gray-2',
    value: '#F5F5F5',
  },
  {
    name: '$color-gray-2',
    variable: '--sl-color-gray-2',
    value: '#EDEDED',
  },
]

const borderTokens = [
  {
    name: '$color-gray-0',
    variable: '--sl-color-gray-0',
    value: '1px solid #EDEDED',
  },
  {
    name: '$color-gray-1',
    variable: '--sl-color-gray-2',
    value: '1px solid #B1B1B1',
  },
  {
    name: '$color-gray-2',
    variable: '--sl-color-gray-2',
    value: '1px solid #D1D5DB',
  },
]

const radiiTokens = [
  {
    name: '$color-gray-0',
    variable: '--sl-color-gray-0',
    value: '0px',
  },
  {
    name: '$color-gray-1',
    variable: '--sl-color-gray-2',
    value: '4px',
  },
  {
    name: '$color-gray-2',
    variable: '--sl-color-gray-2',
    value: '8px',
  },
]

const spacingTokens = [
  {
    name: '$color-gray-0',
    variable: '--sl-color-gray-0',
    value: '2rem',
  },
  {
    name: '$color-gray-1',
    variable: '--sl-color-gray-2',
    value: '4rem',
  },
  {
    name: '$color-gray-2',
    variable: '--sl-color-gray-2',
    value: '6rem',
  },
]

export function TokensGrid(props: TokensTableProps) {
  const { foundation = 'color' } = props

  return (
    <div
      className={csx({
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 1fr 1fr',
      })}
    >
      <Head>Token</Head>
      <Head>CSS Variable</Head>
      <Head>Value</Head>
      <Head>Preview</Head>
      {colorTokens.map((token) => {
        return (
          <>
            <TokenCell>{token.name}</TokenCell>
            <Cell>{token.variable}</Cell>
            <Cell>{token.value}</Cell>
            <PreviewCell foundation={foundation} token={token} />
          </>
        )
      })}
    </div>
  )
}

interface TokensTableProps {
  foundation?: Foundation
}

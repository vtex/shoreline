import React from 'react'
import { Meta } from '@storybook/react'
import { unstableSearchBox as SearchBox } from './index'
import { unstableUseSearchBoxState as useSearchBoxState } from './hooks/useSearchBoxState'
import { Box } from '@vtex/admin-primitives'

export default {
  title: 'admin-ui/SearchBox',
} as Meta

export function Basic() {
  const state = useSearchBoxState({
    collection: [
      'Orders',
      'Products',
      'Pages',
      'Shipping',
      'Store Settings',
      'Transactions',
      'Billing',
      'Site Layout',
      'Promotions',
      'Tracking',
      'Coupons',
    ],
  })

  return (
    <Box
      csx={{
        width: 680,
      }}
    >
      <SearchBox state={state}>
        <SearchBox.Input />
        <SearchBox.Menu>
          <SearchBox.Suggestion />
        </SearchBox.Menu>
        <SearchBox.Footer />
      </SearchBox>
    </Box>
  )
}

export function ScrollTest() {
  const state = useSearchBoxState({
    collection: [
      'Orders',
      'Products',
      'Pages',
      'Shipping',
      'Store Settings',
      'Transactions',
      'Billing',
      'Site Layout',
      'Promotions',
      'Tracking',
      'Coupons',
      'a',
      'aa',
      'aaa',
      'aaaa',
      'aaaaa',
      'aaaaaa',
      'aaaaaaa',
      'aaaaaaaaa',
      'aaaaaaaaaaa',
      'aaaaaaaaaaaa',
      'aaaaaaaaaaaaa',
      'aaaaaaaaaaaaaa',
      'aaaaaaaaaaaaaaa',
      'aaaaaaaaaaaaaaaa',
      'aaaaaaaaaaaaaaaaa',
    ],
  })

  return (
    <Box
      csx={{
        width: 680,
      }}
    >
      <SearchBox state={state}>
        <SearchBox.Input />
        <SearchBox.Menu>
          <SearchBox.Suggestion />
        </SearchBox.Menu>
        <SearchBox.Footer />
      </SearchBox>
    </Box>
  )
}
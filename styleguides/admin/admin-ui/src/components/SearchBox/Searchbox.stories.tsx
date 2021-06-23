import React from 'react'
import { Meta } from '@storybook/react'
import { unstableSearchBox as SearchBox } from './index'
import { unstableUseComboboxState as useComboboxState } from './hooks/useSearchBoxState'

export default {
  title: 'admin-ui/SearchBox',
} as Meta

export function Story() {
  const state = useComboboxState({
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
    <SearchBox state={state}>
      <SearchBox.Input />
      <SearchBox.Menu>
        <SearchBox.Suggestion />
      </SearchBox.Menu>
      <SearchBox.Footer />
    </SearchBox>
  )
}

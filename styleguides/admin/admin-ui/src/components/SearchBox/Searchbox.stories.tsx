/**
 
const state = useSearchBoxState({

})

<SearchBox state={state}>
  <SearchBox.Input />
  <SearchBox.Menu csx={{}}>
    {(item, index) => (
      <Option item={item} index={index}>
        {item.name}
      </Option>
    )}
  </SearchBox.Menu>
  
  <SearchBox.Footer csx={{

  }} />
</SearchBox>

*/

import React from 'react'
import { Meta } from '@storybook/react'
import { unstableSearchBox as SearchBox } from './index'
import { unstableUseComboboxState as useComboboxState } from './hooks/useComboboxState'
import { intl } from './intl'

export default {
  title: 'admin-ui/SearchBox',
} as Meta

export function Story() {
  const state = useComboboxState({
    id: 'with-strings',
    label: intl('label'),
    recordLabel: intl('recordLabel'),
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
    <SearchBox label="search" state={state}>
      <SearchBox.Input />
      <SearchBox.Menu>
        <SearchBox.Suggestion />
      </SearchBox.Menu>
      <SearchBox.Footer />
    </SearchBox>
  )
}

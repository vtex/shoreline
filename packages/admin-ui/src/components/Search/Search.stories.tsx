import React, { useState } from 'react'
import type { Story, Meta } from '@storybook/react'

import type { SearchProps } from './index'
import { Search } from './index'

export default {
  title: 'admin-ui/Search',
  component: Search,
} as Meta

export const Playground: Story<SearchProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Search
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => {
        setValue('')
      }}
      {...args}
    />
  )
}

Playground.args = {
  id: 'search',
  placeholder: 'Search for a product, category or brand',
  onSubmit: () => alert('submited'),
  loading: false,
}

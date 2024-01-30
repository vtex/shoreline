import React from 'react'

import { FilterListSkeleton, FilterItem, Filter } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/filter',
  parameters: {
    // Disabled because filter renders initially as a button
    chromatic: { disableSnapshot: true },
  },
}

export function Show() {
  return (
    <Stack>
      <Filter label="Single status">
        <FilterItem value="Stable">Stable</FilterItem>
        <FilterItem value="Experimental">Experimental</FilterItem>
        <FilterItem value="Deprecated">Deprecated</FilterItem>
      </Filter>

      <Filter label="Multiple status" defaultValue={[]}>
        <FilterItem value="Stable">Stable</FilterItem>
        <FilterItem value="Experimental">Experimental</FilterItem>
        <FilterItem value="Deprecated">Deprecated</FilterItem>
      </Filter>

      <Filter label="Loading example">
        <FilterListSkeleton />
      </Filter>
    </Stack>
  )
}

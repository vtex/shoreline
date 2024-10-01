import { Stack } from '../../stack'
import { Filter, FilterItem, FilterListSkeleton } from '../index'

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

      <Filter label="Disabled" disabled>
        <FilterItem value="Stable">Stable</FilterItem>
        <FilterItem value="Experimental">Experimental</FilterItem>
        <FilterItem value="Deprecated">Deprecated</FilterItem>
      </Filter>
    </Stack>
  )
}

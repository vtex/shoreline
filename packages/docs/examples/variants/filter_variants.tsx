import { useState } from 'react'
import { Filter, FilterItem, FilterListSkeleton } from '@vtex/shoreline'

export function SingleFilter() {
  return (
    <Filter label="Status">
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

export function MultipleFilter() {
  return (
    <Filter label="Status" defaultValue={[]}>
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

export function ControlledFilter() {
  const [status, setStatus] = useState<string>('Experimental')

  return (
    <Filter label="Status" value={status} setValue={setStatus}>
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

export function LoadingFilter() {
  return (
    <Filter label="Loading">
      <FilterListSkeleton />
    </Filter>
  )
}

export function DisabledFilter() {
  return (
    <Filter label="Disabled" disabled>
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

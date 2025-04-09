import { Filter, FilterItem } from '@vtex/shoreline'
import { useState } from 'react'

export default function Example() {
  const [status, setStatus] = useState<string>('Experimental')

  return (
    <Filter label="Status" value={status} setValue={setStatus}>
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

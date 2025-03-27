import { Filter, FilterItem } from '@vtex/shoreline'

export default function Example() {
  return (
    <Filter
      label="Status"
      messages={{
        apply: 'Filter',
        clear: 'Reset',
      }}
    >
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

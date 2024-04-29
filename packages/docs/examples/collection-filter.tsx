import React from 'react'
import {
  Collection,
  CollectionView,
  Filter,
  FilterItem,
  Pagination,
  Search,
  CollectionRow,
  Stack,
} from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <CollectionRow>
        <Stack horizontal>
          <Search />
          <Filter label="Status">
            <FilterItem value="Stable">Stable</FilterItem>
            <FilterItem value="Experimental">Experimental</FilterItem>
            <FilterItem value="Deprecated">Deprecated</FilterItem>
          </Filter>
        </Stack>
        <Pagination page={1} total={74} />
      </CollectionRow>
      <CollectionView status="ready">
        <DecorativeBox subtle height="25rem" />
      </CollectionView>
      <CollectionRow align="flex-end">
        <Pagination page={1} total={74} />
      </CollectionRow>
    </Collection>
  )
}

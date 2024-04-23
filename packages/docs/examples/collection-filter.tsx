import React from 'react'
import {
  Collection,
  CollectionView,
  Filter,
  FilterItem,
  Pagination,
  Search,
  Slot,
  Stack,
} from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <Slot name="header">
        <Slot name="controls">
          <Stack horizontal space="$space-3">
            <Search />
            <Filter label="Status">
              <FilterItem value="Stable">Stable</FilterItem>
              <FilterItem value="Experimental">Experimental</FilterItem>
              <FilterItem value="Deprecated">Deprecated</FilterItem>
            </Filter>
          </Stack>
          <Pagination page={1} total={74} />
        </Slot>
      </Slot>
      <CollectionView status="ready">
        <DecorativeBox subtle height="25rem" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collection>
  )
}

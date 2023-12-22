import React from 'react'

import './stories.css'
import { CollectionView, Collections } from '../index'
import { Slot } from '../../slot'
import { Search } from '../../search'
import { Pagination } from '../../pagination'
import { Filter, FilterOption } from '../../filter'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/collections',
}

export function Default() {
  return (
    <Collections>
      <Slot>
        <Search />
        <Slot>
          <Pagination page={1} total={74} />
        </Slot>
      </Slot>
      <CollectionView status="ready">
        <div className="ready-view" />
      </CollectionView>
      <Slot>
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

export function WithFilter() {
  return (
    <Collections>
      <Slot>
        <Stack direction="row" space="$space-3">
          <Search />
          <Filter label="Status">
            <FilterOption value="Stable">Stable</FilterOption>
            <FilterOption value="Experimental">Experimental</FilterOption>
            <FilterOption value="Deprecated">Deprecated</FilterOption>
          </Filter>
        </Stack>

        <Slot>
          <Pagination page={1} total={74} />
        </Slot>
      </Slot>
      <CollectionView status="ready">
        <div className="ready-view" />
      </CollectionView>
      <Slot>
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

export function WithFilterGroup() {
  return (
    <Collections>
      <Slot>
        <Stack space="$space-4">
          <Search />
          <Slot>
            <Stack direction="row" space="$space-2">
              <Filter label="Status">
                <FilterOption value="Stable">Stable</FilterOption>
                <FilterOption value="Experimental">Experimental</FilterOption>
                <FilterOption value="Deprecated">Deprecated</FilterOption>
              </Filter>
              <Filter label="Status">
                <FilterOption value="Stable">Stable</FilterOption>
                <FilterOption value="Experimental">Experimental</FilterOption>
                <FilterOption value="Deprecated">Deprecated</FilterOption>
              </Filter>
              <Filter label="Status">
                <FilterOption value="Stable">Stable</FilterOption>
                <FilterOption value="Experimental">Experimental</FilterOption>
                <FilterOption value="Deprecated">Deprecated</FilterOption>
              </Filter>
            </Stack>
          </Slot>
        </Stack>

        <Slot>
          <Pagination page={1} total={74} />
        </Slot>
      </Slot>

      <CollectionView status="ready">
        <div className="ready-view" />
      </CollectionView>

      <Slot>
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

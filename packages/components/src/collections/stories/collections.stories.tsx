import React from 'react'

import './stories.css'
import { CollectionView, Collections } from '../index'
import { Slot } from '../../slot'
import { Search } from '../../search'
import { Pagination } from '../../pagination'
import { Filter, FilterItem } from '../../filter'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/collections',
}

export function Default() {
  return (
    <Collections>
      <Slot name="header">
        <Slot name="controls">
          <Search />
          <Pagination page={1} total={74} />
        </Slot>
      </Slot>
      <CollectionView status="ready">
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

export function WithFilter() {
  return (
    <Collections>
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
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

export function WithFilterGroup() {
  return (
    <Collections>
      <Slot name="header">
        <Slot name="controls">
          <Search />
          <Pagination page={1} total={74} />
        </Slot>

        <Slot name="filters">
          <Filter label="Status">
            <FilterItem value="Stable">Stable</FilterItem>
            <FilterItem value="Experimental">Experimental</FilterItem>
            <FilterItem value="Deprecated">Deprecated</FilterItem>
          </Filter>
          <Filter label="Status">
            <FilterItem value="Stable">Stable</FilterItem>
            <FilterItem value="Experimental">Experimental</FilterItem>
            <FilterItem value="Deprecated">Deprecated</FilterItem>
          </Filter>
          <Filter label="Status">
            <FilterItem value="Stable">Stable</FilterItem>
            <FilterItem value="Experimental">Experimental</FilterItem>
            <FilterItem value="Deprecated">Deprecated</FilterItem>
          </Filter>
        </Slot>
      </Slot>

      <CollectionView status="ready">
        <div className="ready-view" />
      </CollectionView>

      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

export function Error() {
  return (
    <Collections>
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
      <CollectionView status="error">
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

export function Empty() {
  return (
    <Collections>
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
      <CollectionView status="empty">
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

export function NotFound() {
  return (
    <Collections>
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
      <CollectionView status="not-found">
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

export function Unauthorized() {
  return (
    <Collections>
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
      <CollectionView status="unauthorized">
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

export function CustomLabel() {
  return (
    <Collections>
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
      <CollectionView
        status="ready"
        messages={{ 'empty-action': 'Create product' }}
      >
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collections>
  )
}

import React from 'react'

import './stories.css'
import { CollectionView, Collection } from '../index'
import { Slot } from '../../slot'
import { Search } from '../../search'
import { Pagination } from '../../pagination'
import { Filter, FilterItem } from '../../filter'
import { Stack } from '../../stack'

export default {
  title: 'components/collections',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Default() {
  return (
    <Collection>
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
    </Collection>
  )
}

export function WithFilter() {
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
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collection>
  )
}

export function WithFilterGroup() {
  return (
    <Collection>
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
    </Collection>
  )
}

export function Error() {
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
      <CollectionView status="error">
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collection>
  )
}

export function Empty() {
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
      <CollectionView status="empty">
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collection>
  )
}

export function NotFound() {
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
      <CollectionView status="not-found">
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collection>
  )
}

export function Unauthorized() {
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
      <CollectionView status="unauthorized">
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collection>
  )
}

export function CustomLabel() {
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
      <CollectionView
        status="ready"
        messages={{ 'empty-action': 'Create product' }}
      >
        <div className="ready-view" />
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collection>
  )
}

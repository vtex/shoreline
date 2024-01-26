import React from 'react'

import './stories.css'
import { CollectionView, Collection } from '../index'
import { Slot } from '../../slot'
import { Search } from '../../search'
import { Pagination } from '../../pagination'
import { Filter, FilterItem } from '../../filter'
import { Stack } from '../../stack'

export default {
  title: 'components/collection',
  // This is required for now because SVGs keep changing between builds
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show() {
  return (
    <Stack fluid>
      {/* Simple */}
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
      {/* With Filter */}
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
      {/* With Filter Group */}
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
      {/* Error */}
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
      {/* Empty */}
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
      {/* Not found */}
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
      {/* Unauthorized */}
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
      {/* Custom label */}
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
    </Stack>
  )
}

import './stories.css'
import { CollectionView, Collection, CollectionRow } from '../index'
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
        <CollectionRow>
          <Search />
          <Pagination page={1} total={74} />
        </CollectionRow>
        <CollectionView status="ready">
          <div className="ready-view" />
        </CollectionView>
        <CollectionRow justify="flex-end">
          <Pagination page={1} total={74} />
        </CollectionRow>
      </Collection>
      {/* With Single Filter */}
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
          <div className="ready-view" />
        </CollectionView>
        <CollectionRow justify="flex-end">
          <Pagination page={1} total={74} />
        </CollectionRow>
      </Collection>
      {/* With Filter Group */}
      <Collection>
        <CollectionRow>
          <Search />
          <Pagination page={1} total={74} />
        </CollectionRow>
        <CollectionRow justify="flex-start">
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
        </CollectionRow>
        <CollectionView status="ready">
          <div className="ready-view" />
        </CollectionView>
        <CollectionRow justify="flex-end">
          <Pagination page={1} total={74} />
        </CollectionRow>
      </Collection>
      {/* Error */}
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
        <CollectionView status="error">
          <div className="ready-view" />
        </CollectionView>
        <CollectionRow align="flex-end">
          <Pagination page={1} total={74} />
        </CollectionRow>
      </Collection>
      {/* Empty */}
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
        <CollectionView status="empty">
          <div className="ready-view" />
        </CollectionView>
        <CollectionRow align="flex-end">
          <Pagination page={1} total={74} />
        </CollectionRow>
      </Collection>
      {/* Not found */}
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
        <CollectionView status="not-found">
          <div className="ready-view" />
        </CollectionView>
        <CollectionRow align="flex-end">
          <Pagination page={1} total={74} />
        </CollectionRow>
      </Collection>
      {/* Unauthorized */}
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
        <CollectionView status="unauthorized">
          <div className="ready-view" />
        </CollectionView>
        <CollectionRow align="flex-end">
          <Pagination page={1} total={74} />
        </CollectionRow>
      </Collection>
      {/* Custom label */}
      <Collection>
        <CollectionRow>
          <Stack horizontal space="$space-3">
            <Search />
            <Filter label="Status">
              <FilterItem value="Stable">Stable</FilterItem>
              <FilterItem value="Experimental">Experimental</FilterItem>
              <FilterItem value="Deprecated">Deprecated</FilterItem>
            </Filter>
          </Stack>
          <Pagination page={1} total={74} />
        </CollectionRow>
        <CollectionView
          status="ready"
          messages={{ 'empty-action': 'Create product' }}
        >
          <div className="ready-view" />
        </CollectionView>
        <CollectionRow align="flex-end">
          <Pagination page={1} total={74} />
        </CollectionRow>
      </Collection>
    </Stack>
  )
}

import {
  Collection,
  CollectionView,
  Filter,
  FilterItem,
  Pagination,
  Search,
  CollectionRow,
} from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
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
        <DecorativeBox subtle height="25rem" />
      </CollectionView>
      <CollectionRow align="flex-end">
        <Pagination page={1} total={74} />
      </CollectionRow>
    </Collection>
  )
}

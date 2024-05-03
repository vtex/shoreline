import {
  Collection,
  CollectionRow,
  CollectionView,
  Pagination,
  Search,
} from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <CollectionRow>
        <Search />
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

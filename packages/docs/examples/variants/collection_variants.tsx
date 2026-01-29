import {
  Collection,
  CollectionRow,
  CollectionView,
  Pagination,
  Search,
} from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export function DefaultCollection() {
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

export function CollectionWithContent() {
  return (
    <Collection>
      <CollectionView status="ready">
        <CollectionRow>Item 1</CollectionRow>
        <CollectionRow>Item 2</CollectionRow>
        <CollectionRow>Item 3</CollectionRow>
      </CollectionView>
    </Collection>
  )
}

export function CollectionWithAlignedRow() {
  return (
    <Collection>
      <CollectionRow align="flex-start">
        <Search />
      </CollectionRow>
      <CollectionView status="ready">
        <DecorativeBox subtle height="20rem" />
      </CollectionView>
      <CollectionRow align="center">
        <Pagination page={1} total={50} />
      </CollectionRow>
    </Collection>
  )
}

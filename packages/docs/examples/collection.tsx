import React from 'react'
import {
  Collection,
  CollectionView,
  Pagination,
  Search,
  Slot,
} from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <Slot name="header">
        <Slot name="controls">
          <Search />
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

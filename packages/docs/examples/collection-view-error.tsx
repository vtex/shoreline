import React from 'react'
import { Collection, CollectionView } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <CollectionView status="error">
        <DecorativeBox height="25rem" />
      </CollectionView>
    </Collection>
  )
}

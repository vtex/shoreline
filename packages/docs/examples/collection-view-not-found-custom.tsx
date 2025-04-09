import { Collection, CollectionView } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <CollectionView
        status="not-found"
        messages={{
          'not-found-heading': 'No products found',
          'not-found-description': 'No products match your search criteria',
        }}
      >
        <DecorativeBox subtle height="25rem" />
      </CollectionView>
    </Collection>
  )
}

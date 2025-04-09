import { Collection, CollectionView } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <CollectionView
        status="error"
        messages={{
          'error-heading': 'Error fetching products',
          'error-action': 'Retry',
        }}
        onError={() => alert('On error action')}
      >
        <DecorativeBox subtle height="25rem" />
      </CollectionView>
    </Collection>
  )
}

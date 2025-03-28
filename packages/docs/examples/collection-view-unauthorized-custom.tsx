import { Collection, CollectionView } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <CollectionView
        status="unauthorized"
        messages={{
          'unauthorized-heading': 'Unauthorized Access',
          'unauthorized-description':
            'You do not have permission to view this content',
        }}
      >
        <DecorativeBox subtle height="25rem" />
      </CollectionView>
    </Collection>
  )
}

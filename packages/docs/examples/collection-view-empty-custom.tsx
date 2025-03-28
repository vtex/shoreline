import { Collection, CollectionView } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <CollectionView
        status="empty"
        messages={{
          'empty-heading': 'No products created inside this category yet.',
          'empty-description': 'Use the button below to create a new product',
          'empty-action': 'Create product',
        }}
        onEmpty={() => alert('On empty action')}
      >
        <DecorativeBox subtle height="25rem" />
      </CollectionView>
    </Collection>
  )
}

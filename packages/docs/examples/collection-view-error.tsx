import { Collection, CollectionView } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Collection>
      <CollectionView status="error">
        <DecorativeBox subtle height="25rem" />
      </CollectionView>
    </Collection>
  )
}

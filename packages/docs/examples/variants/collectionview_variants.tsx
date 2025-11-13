import { Collection, CollectionView, CollectionRow } from '@vtex/shoreline'

export function LoadingCollectionView() {
  return (
    <Collection>
      <CollectionView status="loading" />
    </Collection>
  )
}

export function ReadyCollectionView() {
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

export function ErrorCollectionView() {
  return (
    <Collection>
      <CollectionView status="error" onError={() => console.log('Error')} />
    </Collection>
  )
}

export function EmptyCollectionView() {
  return (
    <Collection>
      <CollectionView status="empty" onEmpty={() => console.log('Empty')} />
    </Collection>
  )
}

export function NotFoundCollectionView() {
  return (
    <Collection>
      <CollectionView status="not-found" />
    </Collection>
  )
}

export function UnauthorizedCollectionView() {
  return (
    <Collection>
      <CollectionView status="unauthorized" />
    </Collection>
  )
}

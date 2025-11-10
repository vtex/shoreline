import { Collection, CollectionView, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Empty Status</Text>
      <Collection>
        <CollectionView status="empty">
          <div
            style={{
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Empty collection
          </div>
        </CollectionView>
      </Collection>

      <Text variant="emphasis">Error Status</Text>
      <Collection>
        <CollectionView status="error">
          <div
            style={{
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Error loading
          </div>
        </CollectionView>
      </Collection>

      <Text variant="emphasis">Not Found Status</Text>
      <Collection>
        <CollectionView status="not-found">
          <div
            style={{
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Not found
          </div>
        </CollectionView>
      </Collection>

      <Text variant="emphasis">Unauthorized Status</Text>
      <Collection>
        <CollectionView status="unauthorized">
          <div
            style={{
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Unauthorized
          </div>
        </CollectionView>
      </Collection>
    </Stack>
  )
}

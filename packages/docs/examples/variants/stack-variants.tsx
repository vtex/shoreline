import { Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Vertical (Default)</Text>
      <Stack>
        <div
          style={{
            padding: '1rem',
            background: '#e0e0e0',
            borderRadius: '4px',
          }}
        >
          Item 1
        </div>
        <div
          style={{
            padding: '1rem',
            background: '#e0e0e0',
            borderRadius: '4px',
          }}
        >
          Item 2
        </div>
        <div
          style={{
            padding: '1rem',
            background: '#e0e0e0',
            borderRadius: '4px',
          }}
        >
          Item 3
        </div>
      </Stack>

      <Text variant="emphasis">Horizontal</Text>
      <Stack horizontal>
        <div
          style={{
            padding: '1rem',
            background: '#e0e0e0',
            borderRadius: '4px',
          }}
        >
          Item 1
        </div>
        <div
          style={{
            padding: '1rem',
            background: '#e0e0e0',
            borderRadius: '4px',
          }}
        >
          Item 2
        </div>
        <div
          style={{
            padding: '1rem',
            background: '#e0e0e0',
            borderRadius: '4px',
          }}
        >
          Item 3
        </div>
      </Stack>

      <Text variant="emphasis">Fluid (Full Width)</Text>
      <Stack fluid>
        <div
          style={{
            padding: '1rem',
            background: '#e0e0e0',
            borderRadius: '4px',
          }}
        >
          Item 1 (full width)
        </div>
        <div
          style={{
            padding: '1rem',
            background: '#e0e0e0',
            borderRadius: '4px',
          }}
        >
          Item 2 (full width)
        </div>
      </Stack>
    </Stack>
  )
}

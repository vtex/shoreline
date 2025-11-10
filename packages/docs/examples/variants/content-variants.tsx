import { Container, Content, Stack, Text, Center } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Normal Width</Text>
      <Container>
        <div style={{ padding: '1rem', background: '#e0e0ff' }}>
          <Content>
            <div
              style={{
                padding: '1rem',
                background: '#b0b0ff',
                borderRadius: '4px',
              }}
            >
              <Center>
                <Text>Normal content width</Text>
              </Center>
            </div>
          </Content>
        </div>
      </Container>

      <Text variant="emphasis">Narrow Width</Text>
      <Container>
        <div style={{ padding: '1rem', background: '#e0e0ff' }}>
          <Content narrow>
            <div
              style={{
                padding: '1rem',
                background: '#b0b0ff',
                borderRadius: '4px',
              }}
            >
              <Center>
                <Text>Narrow content width</Text>
              </Center>
            </div>
          </Content>
        </div>
      </Container>
    </Stack>
  )
}

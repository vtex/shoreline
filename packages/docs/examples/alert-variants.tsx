import { Alert, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Alert variant="informational">
        <Text variant="body">Informational alert message</Text>
      </Alert>
      <Alert variant="success">
        <Text variant="body">Success alert message</Text>
      </Alert>
      <Alert variant="critical">
        <Text variant="body">Critical alert message</Text>
      </Alert>
      <Alert variant="warning">
        <Text variant="body">Warning alert message</Text>
      </Alert>
    </Stack>
  )
}

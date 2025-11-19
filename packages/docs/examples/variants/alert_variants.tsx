import { Alert, Text } from '@vtex/shoreline'

export function InformationalAlert() {
  return (
    <Alert variant="informational">
      <Text variant="body">This is an informational alert message</Text>
    </Alert>
  )
}

export function SuccessAlert() {
  return (
    <Alert variant="success">
      <Text variant="body">This is a success alert message</Text>
    </Alert>
  )
}

export function CriticalAlert() {
  return (
    <Alert variant="critical">
      <Text variant="body">This is a critical alert message</Text>
    </Alert>
  )
}

export function WarningAlert() {
  return (
    <Alert variant="warning">
      <Text variant="body">This is a warning alert message</Text>
    </Alert>
  )
}

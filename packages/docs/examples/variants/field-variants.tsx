import {
  Field,
  FieldDescription,
  FieldError,
  Input,
  Label,
  Stack,
  Text,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Normal Spacing</Text>
      <Field>
        <Label>Label</Label>
        <Input />
        <FieldDescription>Short description</FieldDescription>
      </Field>

      <Text variant="emphasis">Large Spacing</Text>
      <Field space="large">
        <Label>Label</Label>
        <Input />
        <FieldDescription>Short description</FieldDescription>
      </Field>

      <Text variant="emphasis">With Error</Text>
      <Field error>
        <Label>Label</Label>
        <Input />
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Error message</FieldError>
      </Field>

      <Text variant="emphasis">Large with Error</Text>
      <Field space="large" error>
        <Label>Label</Label>
        <Input />
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Error message</FieldError>
      </Field>
    </Stack>
  )
}

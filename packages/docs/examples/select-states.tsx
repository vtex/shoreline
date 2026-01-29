import {
  Field,
  FieldDescription,
  FieldError,
  Label,
  Select,
  SelectItem,
  Stack,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack>
      <Field>
        <Label>Plain select</Label>
        <Select>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
      </Field>
      <Field>
        <Label>With description</Label>
        <Select>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
        <FieldDescription>Short description</FieldDescription>
      </Field>
      <Field error>
        <Label>With error</Label>
        <Select>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
        <FieldError>Short error message</FieldError>
      </Field>
      <Field error>
        <Label>With error and description</Label>
        <Select>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Short error message</FieldError>
      </Field>
      <Field>
        <Label>Disabled</Label>
        <Select disabled>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
      </Field>
    </Stack>
  )
}

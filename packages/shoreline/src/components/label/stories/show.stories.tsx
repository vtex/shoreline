import { Label } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/label',
}

export function Show() {
  return (
    <Stack>
      <Label>Label</Label>
      <Label optional>Label</Label>
      <Stack asChild space="$space-1">
        <fieldset>
          <Label htmlFor="example">Label for input</Label>
          <input id="example" />
        </fieldset>
      </Stack>
    </Stack>
  )
}

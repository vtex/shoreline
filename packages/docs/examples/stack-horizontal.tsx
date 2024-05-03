import { Stack } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Stack horizontal>
      <DecorativeBox height="64px" />
      <DecorativeBox height="64px" />
      <DecorativeBox height="64px" />
      <DecorativeBox height="64px" />
      <DecorativeBox height="64px" />
    </Stack>
  )
}

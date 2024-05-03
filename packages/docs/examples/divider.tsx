import { Divider, Flex } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Flex direction="column">
      <DecorativeBox height="64px" color="blue" />
      <Divider />
      <DecorativeBox height="64px" color="blue" />
    </Flex>
  )
}

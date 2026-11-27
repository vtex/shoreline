import { Flex, IconSparkle } from '@vtex/shoreline'
import { AIWorkingMark } from '@vtex/shoreline-ai'

// No provider needed: the mark is decorative and works anywhere.
export default function Example() {
  return (
    <Flex gap="$space-4" align="center">
      {/* The default glyph: the My Assistant mark */}
      <AIWorkingMark />

      {/* The glyph of your app */}
      <AIWorkingMark>
        <IconSparkle />
      </AIWorkingMark>
    </Flex>
  )
}

import { Flex, IconSparkle } from '@vtex/shoreline'
import { AIThinkingIndicator, AIWorkingMark } from '@vtex/shoreline-ai'
import { AIDemoProvider } from '../components/ai-demo'

export default function Example() {
  return (
    <AIDemoProvider>
      <Flex direction="column" gap="$space-4" align="start">
        {/* The text loading effect. It has no default text and no role. */}
        <AIThinkingIndicator>Searching orders…</AIThinkingIndicator>

        {/* The working mark, with the default glyph */}
        <AIWorkingMark />

        {/* The working mark with the app's own glyph */}
        <AIWorkingMark>
          <IconSparkle />
        </AIWorkingMark>
      </Flex>
    </AIDemoProvider>
  )
}

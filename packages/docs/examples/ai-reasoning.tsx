import { Text } from '@vtex/shoreline'
import {
  AIMessageAssistant,
  AIReasoningContent,
  AIReasoningHeader,
  AIReasoningRoot,
  AIMessages,
} from '@vtex/shoreline-ai'
import {
  AIDemoMessages,
  AIDemoProvider,
  demoAnswer,
} from '../components/ai-demo'

export default function Example() {
  return (
    <AIDemoProvider>
      <AIDemoMessages messages={demoAnswer}>
        <AIMessages>
          <AIMessageAssistant>
            {/* Running: mark, shimmering label, elapsed time and chevron */}
            <AIReasoningRoot status="running">
              <AIReasoningHeader />
            </AIReasoningRoot>

            {/* Complete with a duration: "Thought for 2m" */}
            <AIReasoningRoot status="complete" duration={120_000}>
              <AIReasoningHeader />
            </AIReasoningRoot>

            {/* Complete and open from the start, with the reasoning text */}
            <AIReasoningRoot
              status="complete"
              duration={42_000}
              defaultExpanded
            >
              <AIReasoningHeader />
              <AIReasoningContent>
                <Text variant="caption2" color="base-soft">
                  Comparing each order with its promised delivery date.
                </Text>
              </AIReasoningContent>
            </AIReasoningRoot>
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

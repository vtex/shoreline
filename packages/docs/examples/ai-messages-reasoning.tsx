import { Text } from '@vtex/shoreline'
import {
  AIMessageAssistant,
  AIMessageReasoningContent,
  AIMessageReasoningHeader,
  AIMessageReasoningRoot,
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
            <AIMessageReasoningRoot status="running">
              <AIMessageReasoningHeader />
            </AIMessageReasoningRoot>

            {/* Complete with a duration: "Reasoning completed in 2m" */}
            <AIMessageReasoningRoot status="complete" duration={120_000}>
              <AIMessageReasoningHeader />
            </AIMessageReasoningRoot>

            {/* Complete and open from the start, with the reasoning text */}
            <AIMessageReasoningRoot
              status="complete"
              duration={42_000}
              defaultExpanded
            >
              <AIMessageReasoningHeader />
              <AIMessageReasoningContent>
                <Text variant="caption2" color="base-soft">
                  Comparing each order with its promised delivery date.
                </Text>
              </AIMessageReasoningContent>
            </AIMessageReasoningRoot>
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

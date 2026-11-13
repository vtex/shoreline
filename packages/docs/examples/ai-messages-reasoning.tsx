import { Text } from '@vtex/shoreline'
import {
  AIMessageAssistant,
  AIMessageReasoningContent,
  AIMessageReasoningRoot,
  AIMessageReasoningTrigger,
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
            {/* Running: the label reads "Reasoning" */}
            <AIMessageReasoningRoot status="running">
              <AIMessageReasoningTrigger />
            </AIMessageReasoningRoot>

            {/* Complete: the label reads "Reasoned" */}
            <AIMessageReasoningRoot status="complete">
              <AIMessageReasoningTrigger />
            </AIMessageReasoningRoot>

            {/* Expanded from the start, with the reasoning text inside */}
            <AIMessageReasoningRoot status="complete" defaultExpanded>
              <AIMessageReasoningTrigger />
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

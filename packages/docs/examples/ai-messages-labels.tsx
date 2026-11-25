import {
  AIMessageAssistant,
  AIMessageParts,
  AIMessageReasoningRoot,
  AIMessageReasoningHeader,
  AIMessageReasoningLabel,
  AIMessageReasoningTrigger,
  AIMessageActions,
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
        {/* A text for the whole chat: the catalog override */}
        <AIMessages
          messages={{
            reasoningStreaming: 'Working on it…',
            reasoningDone: 'Done thinking',
            copyMessage: 'Copy the answer',
          }}
        >
          <AIMessageAssistant>
            <AIMessageReasoningRoot status="running">
              <AIMessageReasoningHeader />
            </AIMessageReasoningRoot>
            <AIMessageReasoningRoot status="complete">
              <AIMessageReasoningHeader />
            </AIMessageReasoningRoot>

            {/* A text for one label: children of the label */}
            <AIMessageReasoningRoot status="complete">
              <AIMessageReasoningHeader>
                <AIMessageReasoningLabel>
                  Checked 3 orders
                </AIMessageReasoningLabel>
                <AIMessageReasoningTrigger />
              </AIMessageReasoningHeader>
            </AIMessageReasoningRoot>

            <AIMessageParts />
            <AIMessageActions />
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

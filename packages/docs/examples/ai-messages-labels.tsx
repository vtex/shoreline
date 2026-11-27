import {
  AIMessageAssistant,
  AIMessageParts,
  AIReasoningRoot,
  AIReasoningHeader,
  AIReasoningLabel,
  AIReasoningTrigger,
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
            reasoningDone: 'All done',
            copyMessage: 'Copy the answer',
          }}
        >
          <AIMessageAssistant>
            <AIReasoningRoot status="running">
              <AIReasoningHeader />
            </AIReasoningRoot>
            <AIReasoningRoot status="complete">
              <AIReasoningHeader />
            </AIReasoningRoot>

            {/* A text for one label: children of the label */}
            <AIReasoningRoot status="complete">
              <AIReasoningHeader>
                <AIReasoningLabel>Checked 3 orders</AIReasoningLabel>
                <AIReasoningTrigger />
              </AIReasoningHeader>
            </AIReasoningRoot>

            <AIMessageParts />
            <AIMessageActions />
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

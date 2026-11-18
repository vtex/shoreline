import {
  AIMessageAssistant,
  AIMessageReasoningRoot,
  AIMessageReasoningTrigger,
  AIMessages,
  AIThinkingIndicator,
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
        <AIMessages
          messages={{
            reasoningStreaming: 'Working on it',
            reasoningReady: 'Done thinking',
            thinking: 'One moment',
            messageCopied: 'Copied to the clipboard',
          }}
        >
          <AIMessageAssistant>
            <AIThinkingIndicator />
            <AIMessageReasoningRoot status="running">
              <AIMessageReasoningTrigger />
            </AIMessageReasoningRoot>
            <AIMessageReasoningRoot status="complete">
              <AIMessageReasoningTrigger />
            </AIMessageReasoningRoot>
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

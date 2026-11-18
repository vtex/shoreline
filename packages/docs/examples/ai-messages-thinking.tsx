import {
  AIMessageAssistant,
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
        <AIMessages>
          <AIMessageAssistant>
            <AIThinkingIndicator />
            <AIThinkingIndicator label="Checking your orders" />
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

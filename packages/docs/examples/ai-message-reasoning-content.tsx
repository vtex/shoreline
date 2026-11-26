import {
  AIMessageActions,
  AIMessageAssistant,
  AIMessageParts,
  AIMessageReasoning,
  AIMessageUser,
  AIMessages,
} from '@vtex/shoreline-ai'
import {
  AIDemoMessages,
  AIDemoProvider,
  demoConversation,
} from '../components/ai-demo'

export default function Example() {
  return (
    <AIDemoProvider>
      <AIDemoMessages messages={demoConversation}>
        <AIMessages>
          <AIMessageUser />
          <AIMessageAssistant>
            {/* Open from the start: the reasoning text, then the tool step */}
            <AIMessageParts
              reasoning={<AIMessageReasoning defaultExpanded />}
            />
            <AIMessageActions />
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

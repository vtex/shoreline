import {
  AIMessageAssistant,
  AIMessageActions,
  AIMessageParts,
  AIMessageReasoning,
  AIMessageReasoningContent,
  AIMessageReasoningElapsed,
  AIMessageReasoningHeader,
  AIMessageReasoningLabel,
  AIMessageReasoningMark,
  AIMessageReasoningTrigger,
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
            <AIMessageParts
              showReasoningTools={false}
              // The template is rendered once per reasoning group
              reasoning={
                <AIMessageReasoning defaultExpanded>
                  <AIMessageReasoningHeader>
                    <AIMessageReasoningMark />
                    <AIMessageReasoningLabel>
                      Analyzing orders
                    </AIMessageReasoningLabel>
                    <AIMessageReasoningElapsed />
                    <AIMessageReasoningTrigger />
                  </AIMessageReasoningHeader>
                  <AIMessageReasoningContent />
                </AIMessageReasoning>
              }
            />
            <AIMessageActions />
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

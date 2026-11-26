import {
  AIMessageAssistant,
  AIMessageActions,
  AIMessageParts,
  AIReasoning,
  AIReasoningContent,
  AIReasoningElapsed,
  AIReasoningHeader,
  AIReasoningLabel,
  AIReasoningMark,
  AIReasoningTrigger,
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
                <AIReasoning defaultExpanded>
                  <AIReasoningHeader>
                    <AIReasoningMark />
                    <AIReasoningLabel>Analyzing orders</AIReasoningLabel>
                    <AIReasoningElapsed />
                    <AIReasoningTrigger />
                  </AIReasoningHeader>
                  <AIReasoningContent />
                </AIReasoning>
              }
            />
            <AIMessageActions />
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

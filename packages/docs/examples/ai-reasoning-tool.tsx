import { Text } from '@vtex/shoreline'
import {
  AIMessageActions,
  AIMessageAssistant,
  AIMessageParts,
  AIReasoning,
  AIMessageUser,
  AIMessages,
} from '@vtex/shoreline-ai'
import {
  AIDemoMessages,
  AIDemoProvider,
  demoConversation,
} from '../components/ai-demo'

// search_orders has no makeAIToolUI registration, so it belongs to the
// reasoning panel. The renderer draws it there with the app's own component.
function SearchOrdersStep(props: { count: number }) {
  return (
    <Text variant="caption2" color="base-soft">
      Found {props.count} late orders
    </Text>
  )
}

export default function Example() {
  return (
    <AIDemoProvider>
      <AIDemoMessages messages={demoConversation}>
        <AIMessages>
          <AIMessageUser />
          <AIMessageAssistant>
            <AIMessageParts reasoning={<AIReasoning defaultExpanded />}>
              {(part, meta) => {
                if (
                  part.type === 'tool' &&
                  part.name === 'search_orders' &&
                  meta.placement === 'cot'
                ) {
                  const output = part.output as { count: number } | undefined

                  return <SearchOrdersStep count={output?.count ?? 0} />
                }

                return null
              }}
            </AIMessageParts>
            <AIMessageActions />
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

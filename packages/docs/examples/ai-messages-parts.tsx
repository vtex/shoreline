import { Text } from '@vtex/shoreline'
import {
  AIMessageAssistant,
  AIMessageParts,
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
          <AIMessageAssistant>
            <AIMessageParts>
              {(part) => {
                // Replace the text part with your own markup
                if (part.type === 'text') {
                  return (
                    <Text variant="display3" as="p">
                      {part.text}
                    </Text>
                  )
                }

                // null keeps the built-in rendering for everything else
                return null
              }}
            </AIMessageParts>
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

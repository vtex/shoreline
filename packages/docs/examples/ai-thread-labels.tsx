import {
  AIMessages,
  AIThread,
  AIThreadScrollToBottom,
  AIThreadViewport,
  AIThreadViewportFooter,
} from '@vtex/shoreline-ai'
import {
  AIDemoMessages,
  AIDemoProvider,
  demoConversation,
} from '../components/ai-demo'

const longConversation = Array.from({ length: 6 }, (_, index) =>
  demoConversation.map((message) => ({
    ...message,
    id: [message.id, index].join('-'),
  }))
).flat()

export default function Example() {
  return (
    <AIDemoProvider>
      <AIDemoMessages messages={longConversation}>
        <div style={{ height: 320 }}>
          <AIThread messages={{ scrollToBottom: 'Go to the latest message' }}>
            <AIThreadViewport>
              <AIMessages />
              <AIThreadViewportFooter>
                <AIThreadScrollToBottom />
              </AIThreadViewportFooter>
            </AIThreadViewport>
          </AIThread>
        </div>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

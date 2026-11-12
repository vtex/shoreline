import { AIMessages } from '@vtex/shoreline-ai'
import {
  AIDemoMessages,
  AIDemoProvider,
  demoConversation,
} from '../components/ai-demo'

export default function Example() {
  return (
    <AIDemoProvider>
      <AIDemoMessages messages={demoConversation}>
        <AIMessages showReasoningTools={false} />
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

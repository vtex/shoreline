import {
  AIComposer,
  AIComposerActions,
  AIComposerCancel,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
  AIComposerSend,
  useAIStatus,
} from '@vtex/shoreline-ai'
import { AIDemoProvider } from '../components/ai-demo'

function SendOrCancel() {
  const { isStreaming } = useAIStatus()

  return (
    <AIComposerActions>
      {isStreaming ? <AIComposerCancel /> : <AIComposerSend />}
    </AIComposerActions>
  )
}

export default function Example() {
  return (
    <AIDemoProvider>
      <AIComposer>
        <AIComposerField>
          <AIComposerInput />
          <AIComposerFooter>
            <SendOrCancel />
          </AIComposerFooter>
        </AIComposerField>
      </AIComposer>
    </AIDemoProvider>
  )
}

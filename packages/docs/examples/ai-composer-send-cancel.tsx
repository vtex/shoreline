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

  return isStreaming ? <AIComposerCancel /> : <AIComposerSend />
}

export default function Example() {
  return (
    <AIDemoProvider>
      <AIComposer>
        <AIComposerField>
          <AIComposerInput />
          <AIComposerFooter>
            <AIComposerActions>
              <SendOrCancel />
            </AIComposerActions>
          </AIComposerFooter>
        </AIComposerField>
      </AIComposer>
    </AIDemoProvider>
  )
}

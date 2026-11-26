import { Button, Flex } from '@vtex/shoreline'
import {
  AIComposer,
  AIComposerAction,
  AIComposerActions,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
  useAIComposer,
} from '@vtex/shoreline-ai'
import { AIDemoProvider } from '../components/ai-demo'

function Toolbar() {
  const { text, setText, reset } = useAIComposer()

  return (
    <Flex align="center" gap="$space-2" style={{ marginBottom: 12 }}>
      <Button size="normal" onClick={() => setText('Summarize my orders')}>
        Prefill
      </Button>
      <Button size="normal" onClick={reset}>
        Clear
      </Button>
      <span>{text.length} chars</span>
    </Flex>
  )
}

export default function Example() {
  return (
    <AIDemoProvider>
      <Toolbar />
      <AIComposer>
        <AIComposerField>
          <AIComposerInput />
          <AIComposerFooter>
            <AIComposerActions>
              <AIComposerAction />
            </AIComposerActions>
          </AIComposerFooter>
        </AIComposerField>
      </AIComposer>
    </AIDemoProvider>
  )
}

import { Text } from '@vtex/shoreline'
import {
  AIComposer,
  AIComposerAction,
  AIComposerActions,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
  AIMessages,
  AIThread,
  AIThreadEmpty,
  AIThreadScrollToBottom,
  AIThreadViewport,
  AIThreadViewportFooter,
} from '@vtex/shoreline-ai'
import { AIDemoProvider } from '../components/ai-demo'

export default function Example() {
  return (
    <AIDemoProvider>
      <div style={{ height: 420 }}>
        <AIThread>
          <AIThreadViewport>
            <AIThreadEmpty>
              <Text variant="display3">How can I help you today?</Text>
            </AIThreadEmpty>
            <AIMessages />
            <AIThreadViewportFooter>
              <AIThreadScrollToBottom />
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
            </AIThreadViewportFooter>
          </AIThreadViewport>
        </AIThread>
      </div>
    </AIDemoProvider>
  )
}

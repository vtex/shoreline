import {
  AIComposer,
  AIComposerAction,
  AIComposerActions,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
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

export default function Example() {
  return (
    <AIDemoProvider>
      <AIDemoMessages messages={demoConversation}>
        <div style={{ height: 420 }}>
          <AIThread>
            <AIThreadViewport>
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
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

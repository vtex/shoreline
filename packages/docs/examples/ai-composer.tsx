import {
  AIComposer,
  AIComposerAction,
  AIComposerActions,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
} from '@vtex/shoreline-ai'
import { AIDemoProvider } from '../components/ai-demo'

export default function Example() {
  return (
    <AIDemoProvider>
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

import {
  AIComposer,
  AIComposerAction,
  AIComposerActions,
  AIComposerAddAttachment,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
} from '@vtex/shoreline-ai'
import { AIDemoProvider } from '../components/ai-demo'

export default function Example() {
  return (
    <AIDemoProvider>
      <AIComposer layout="stacked">
        <AIComposerField>
          <AIComposerInput />
          <AIComposerFooter>
            <AIComposerAddAttachment />
            <AIComposerActions>
              <AIComposerAction />
            </AIComposerActions>
          </AIComposerFooter>
        </AIComposerField>
      </AIComposer>
    </AIDemoProvider>
  )
}

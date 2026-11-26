import {
  AIComposer,
  AIComposerAction,
  AIComposerActions,
  AIComposerAddAttachment,
  AIComposerAttachments,
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
          <AIComposerAttachments />
          <AIComposerInput />
          <AIComposerFooter>
            <AIComposerAddAttachment multiple />
            <AIComposerActions>
              <AIComposerAction />
            </AIComposerActions>
          </AIComposerFooter>
        </AIComposerField>
      </AIComposer>
    </AIDemoProvider>
  )
}

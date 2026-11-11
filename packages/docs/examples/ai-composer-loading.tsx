import { AIComposer } from '@vtex/shoreline-ai'
import { AIDemoProvider } from '../components/ai-demo'

export default function Example() {
  return (
    <AIDemoProvider>
      <AIComposer loading />
    </AIDemoProvider>
  )
}

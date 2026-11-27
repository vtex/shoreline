import { Text } from '@vtex/shoreline'
import { AIMessages, makeAIToolUI, type AIMessage } from '@vtex/shoreline-ai'
import { AIDemoMessages, AIDemoProvider } from '../components/ai-demo'

const CheckStockUI = makeAIToolUI<{ sku: string }, { units: number }>({
  component: 'check_stock',
  mode: 'widget',
  render: ({ args, result, status }) => (
    <Text variant="caption1" as="div">
      Stock of {args.sku}:{' '}
      {status === 'complete' ? <>{result?.units} units</> : 'checking...'}
    </Text>
  ),
})

const messages: AIMessage[] = [
  {
    id: 'tool-ui-1',
    role: 'assistant',
    createdAt: '2026-05-20T12:00:00.000Z',
    parts: [
      {
        type: 'tool',
        name: 'check_stock',
        args: { sku: 'SKU-1042' },
        output: { units: 18 },
        status: 'complete',
      },
      { type: 'text', text: 'There are 18 units left in stock.' },
    ],
  },
]

export default function Example() {
  return (
    <AIDemoProvider>
      {/* Mount the registered tool UI once, under the provider */}
      <CheckStockUI />
      <AIDemoMessages messages={messages}>
        <AIMessages />
      </AIDemoMessages>
    </AIDemoProvider>
  )
}

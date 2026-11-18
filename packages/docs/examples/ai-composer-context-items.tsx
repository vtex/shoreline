import { useState } from 'react'
import {
  AIComposer,
  AIComposerAction,
  AIComposerActions,
  AIComposerContextItem,
  AIComposerContextItems,
  AIComposerField,
  AIComposerFooter,
  AIComposerHeader,
  AIComposerInput,
} from '@vtex/shoreline-ai'
import { AIDemoProvider } from '../components/ai-demo'

export default function Example() {
  const [items, setItems] = useState([
    { id: 1, title: 'Orders report - October' },
    { id: 2, title: 'Catalog export' },
  ])

  return (
    <AIDemoProvider>
      <AIComposer>
        <AIComposerHeader>
          <AIComposerContextItems>
            {items.map((item) => (
              <AIComposerContextItem
                key={item.id}
                onRemove={() =>
                  setItems((current) => current.filter((i) => i.id !== item.id))
                }
              >
                {item.title}
              </AIComposerContextItem>
            ))}
          </AIComposerContextItems>
        </AIComposerHeader>
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

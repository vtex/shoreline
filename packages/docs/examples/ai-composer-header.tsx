import { useState } from 'react'
import {
  AIComposer,
  AIComposerAction,
  AIComposerActions,
  AIComposerField,
  AIComposerFooter,
  AIComposerHeader,
  AIComposerInput,
} from '@vtex/shoreline-ai'
import { IconCaretDownSmall } from '@vtex/shoreline'
import { AIDemoProvider } from '../components/ai-demo'

const tasks = [
  'Create landing pages for the new products',
  'Create promotional campaigns for the new products',
]

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <AIDemoProvider>
      <AIComposer>
        <AIComposerHeader>
          <div
            style={{
              border: 'var(--sl-border-base)',
              borderBottom: 0,
              borderRadius:
                'var(--sl-radius-4, 1.5rem) var(--sl-radius-4, 1.5rem) 0 0',
              background: 'var(--sl-bg-base)',
              paddingBottom: 'var(--sl-ai-composer-overlap)',
            }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((current) => !current)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sl-space-2)',
                width: '100%',
                padding: 'var(--sl-space-2) var(--sl-space-4)',
                border: 0,
                background: 'transparent',
                color: 'var(--sl-fg-base)',
                font: 'var(--sl-text-body-font)',
                cursor: 'pointer',
              }}
            >
              <IconCaretDownSmall
                style={{ transform: open ? 'none' : 'rotate(-90deg)' }}
              />
              Recently added products
            </button>
            {open &&
              tasks.map((task) => (
                <div
                  key={task}
                  style={{
                    padding: 'var(--sl-space-2) var(--sl-space-4)',
                    borderTop: 'var(--sl-border-base)',
                    color: 'var(--sl-fg-muted)',
                    font: 'var(--sl-text-body-font)',
                  }}
                >
                  {task}
                </div>
              ))}
          </div>
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

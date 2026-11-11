import { useState } from 'react'
import { IconCaretDownSmall, Text } from '@vtex/shoreline'

const TASKS = [
  'Create New Arrivals landing pages for the new products',
  'Create promotional campaigns for the new products',
  'Adjust search and create keywords for the new products',
]

/**
 * Story-only card that an app would draw inside `AIComposerHeader`. It is not
 * part of the package: it only shows that the slot needs no visual from it,
 * and that `--sl-ai-composer-overlap` keeps the content clear of the pill.
 */
export function InitiativeCard(props: { defaultOpen?: boolean }) {
  const { defaultOpen = false } = props
  const [open, setOpen] = useState(defaultOpen)

  return (
    <>
      <style>{`
        [data-story-card] { box-sizing: border-box; border: var(--sl-border-base); border-bottom: 0; border-radius: var(--sl-radius-4, 1.5rem) var(--sl-radius-4, 1.5rem) 0 0; background: var(--sl-bg-base); padding-bottom: var(--sl-ai-composer-overlap); }
        [data-story-card-top] { display: flex; align-items: center; gap: var(--sl-space-2); width: 100%; padding: var(--sl-space-2) var(--sl-space-4); border: 0; background: transparent; color: var(--sl-fg-base); font: var(--sl-text-body-font); cursor: pointer; text-align: start; }
        [data-story-card-badge] { padding: 0 var(--sl-space-2); border-radius: var(--sl-radius-1); background: var(--sl-color-gray-3); font-weight: 600; }
        [data-story-card-bar] { flex: 1; height: var(--sl-space-1); border-radius: var(--sl-radius-full); background: var(--sl-color-gray-3); }
        [data-story-card-task] { display: flex; align-items: center; gap: var(--sl-space-3); padding: var(--sl-space-2) var(--sl-space-4); border-top: var(--sl-border-base); color: var(--sl-fg-muted); font: var(--sl-text-body-font); }
      `}</style>
      <div data-story-card="">
        <button
          type="button"
          data-story-card-top=""
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <IconCaretDownSmall
            style={{ transform: open ? 'none' : 'rotate(-90deg)' }}
          />
          <span data-story-card-badge="">IN6401</span>
          <Text variant="body">
            50 recently added products with high stock and low sales
          </Text>
          <span data-story-card-bar="" />
          <Text variant="body">0/3</Text>
        </button>
        {open &&
          TASKS.map((task) => (
            <div key={task} data-story-card-task="">
              {task}
            </div>
          ))}
      </div>
    </>
  )
}

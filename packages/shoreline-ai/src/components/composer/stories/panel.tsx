import type { ComponentType, RefObject } from 'react'
import { ComboboxItem, ComboboxPopover, Text } from '@vtex/shoreline'

// The Shoreline Combobox types omit these Ariakit props; they are forwarded at runtime.
// `setValueOnClick: false` keeps the clicked entry out of the draft.
const KEEP_DRAFT = { setValueOnClick: false }
const FLOAT_ABOVE = {
  placement: 'top',
  gutter: 8,
  portal: true,
  sameWidth: true,
}

export interface StoryPanelSection {
  title: string
  icon: ComponentType
  entries: string[]
}

/**
 * Example panel for the history and suggestions recipe. Shoreline ships the
 * combobox without styles, so the app draws the card. It floats above the field
 * (anchored to it, not to the textarea) and spans its width.
 */
export function StoryPanel(props: {
  fieldRef: RefObject<HTMLElement>
  sections: StoryPanelSection[]
  onPick: (entry: string) => void
}) {
  const { fieldRef, sections, onPick } = props
  const floating = {
    ...FLOAT_ABOVE,
    getAnchorRect: () => fieldRef.current?.getBoundingClientRect() ?? null,
  }

  return (
    <>
      <style>{`
        [data-story-panel] { z-index: 10; box-sizing: border-box; padding: var(--sl-space-4); border: var(--sl-border-base); border-radius: var(--sl-radius-4, 1.5rem); background: var(--sl-bg-base); box-shadow: 0 8px 24px rgb(0 0 0 / 0.08); display: flex; flex-direction: column; gap: var(--sl-space-4); max-height: min(24rem, 60vh); overflow-y: auto; }
        [data-story-panel-section] { display: flex; flex-direction: column; gap: var(--sl-space-1); }
        [data-story-panel-item] { display: flex; align-items: center; gap: var(--sl-space-3); padding: var(--sl-space-2); border-radius: var(--sl-radius-2); color: var(--sl-fg-base); font: var(--sl-text-body-font); cursor: pointer; }
        [data-story-panel-item][data-active-item] { background: var(--sl-bg-muted); }
      `}</style>
      <ComboboxPopover data-story-panel="" {...floating}>
        {sections.map((section) => (
          <div key={section.title} data-story-panel-section="">
            <Text
              variant="caption1"
              role="presentation"
              style={{ color: 'var(--sl-fg-muted)' }}
            >
              {section.title}
            </Text>
            {section.entries.map((entry) => (
              <ComboboxItem
                key={entry}
                value={entry}
                data-story-panel-item=""
                {...KEEP_DRAFT}
                onClick={() => onPick(entry)}
              >
                <section.icon />
                {entry}
              </ComboboxItem>
            ))}
          </div>
        ))}
      </ComboboxPopover>
    </>
  )
}

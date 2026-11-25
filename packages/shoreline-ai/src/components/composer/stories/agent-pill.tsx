import { Text } from '@vtex/shoreline'

/**
 * Story-only stand-in for the AI Workspace agent selector, as the Horizon
 * styleguide draws it: no background, a 12px brand mark in a 16px box and the agent name in
 * `--sl-text-emphasis`. The real selector is app code, outside the package. In
 * the compact form only the mark shows; the name stays for screen readers.
 */
export function StoryAgentPill(props: { compact?: boolean }) {
  const { compact = false } = props

  return (
    <>
      <style>{`
        [data-story-agent-pill] { display: inline-flex; align-items: center; gap: var(--sl-space-1); box-sizing: border-box; height: calc(var(--sl-space-8) + var(--sl-space-1)); padding: 0 var(--sl-space-2); border-radius: var(--sl-radius-full); color: var(--sl-fg-base); white-space: nowrap; }
        [data-story-agent-pill][data-compact] { padding-inline-end: 0; }
        [data-story-agent-mark] { display: inline-flex; align-items: center; justify-content: center; width: var(--sl-space-4); height: var(--sl-space-4); flex-shrink: 0; }
        [data-story-agent-mark] svg { width: var(--sl-space-3); height: var(--sl-space-3); }
        [data-story-agent-name] { font: var(--sl-text-emphasis-font); letter-spacing: var(--sl-text-emphasis-letter-spacing); }
        [data-story-agent-name][data-compact] { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
      `}</style>
      <span data-story-agent-pill="" data-compact={compact ? '' : undefined}>
        <span data-story-agent-mark="" aria-hidden="true">
          <svg viewBox="0 0 14 14" fill="none" focusable="false">
            <path
              d="M11.8478 0.143845C13.1249 -0.4434 14.4434 0.875066 13.8562 2.15219L11.627 7L13.8562 11.8478C14.4434 13.1249 13.1249 14.4434 11.8478 13.8562L7 11.627L2.15219 13.8562C0.875063 14.4434 -0.443399 13.1249 0.143845 11.8478L2.37296 7L0.143845 2.15219C-0.443399 0.875063 0.875065 -0.443399 2.15219 0.143846L7 2.37296L11.8478 0.143845Z"
              fill="#F71963"
            />
          </svg>
        </span>
        <Text
          variant="body"
          data-story-agent-name=""
          data-compact={compact ? '' : undefined}
          style={{ color: 'inherit' }}
        >
          My Assistant
        </Text>
      </span>
    </>
  )
}

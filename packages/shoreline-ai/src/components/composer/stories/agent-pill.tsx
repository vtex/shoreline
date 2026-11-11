import { IconCaretDownSmall, IconXSmall, Text } from '@vtex/shoreline'

/**
 * Story-only stand-in for the AI Workspace agent pill (values from
 * `agent-pill.css` in admin-platform): a white pill with the avatar, the agent
 * name and a caret. The real pill is app code, outside the package. In the
 * compact form only the avatar and the caret show; the name stays for screen
 * readers.
 */
export function StoryAgentPill(props: { compact?: boolean }) {
  const { compact = false } = props

  return (
    <>
      <style>{`
        [data-story-agent-pill] { display: inline-flex; align-items: center; gap: var(--sl-space-1); box-sizing: border-box; height: calc(var(--sl-space-8) + var(--sl-space-1)); padding: var(--sl-space-1) var(--sl-space-2) var(--sl-space-1) var(--sl-space-1); border-radius: var(--sl-radius-full); background: var(--sl-bg-base); color: var(--sl-fg-muted); font: var(--sl-text-body-font); white-space: nowrap; }
        [data-story-agent-avatar] { display: inline-flex; align-items: center; justify-content: center; width: var(--sl-space-7); height: var(--sl-space-7); border-radius: var(--sl-radius-full); background: var(--sl-color-red-3); color: var(--sl-color-red-9); flex-shrink: 0; }
        [data-story-agent-pill] svg { flex-shrink: 0; }
        [data-story-agent-name][data-compact] { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
      `}</style>
      <span data-story-agent-pill="">
        <span data-story-agent-avatar="" aria-hidden="true">
          <IconXSmall />
        </span>
        <Text
          variant="body"
          data-story-agent-name=""
          data-compact={compact ? '' : undefined}
          style={{ color: 'inherit' }}
        >
          VTEX My Assistant
        </Text>
        <IconCaretDownSmall />
      </span>
    </>
  )
}
